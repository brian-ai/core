const fs = require('fs')
const http = require('http')
const httpShutdown = require('http-shutdown')
const url = require('url')
const qs = require('qs')
const opn = require('opn')
const request = require('request')

/**
 * port: Port to listen on for authorization (required, default: 8888).
 * clientId: Spotify client id (required).
 * clientSecret: Spotify client secret (required).
 * scope: Array of Spotify authorization scope strings (required, default: []).
 * path: Path to file where Spotify access and refresh tokens should be stored (optional).
 *
 * @type {{port: number, clientId: string, clientSecret: string, scope: Array, path: string}}
 */
const opts = {
  port: 8888,
  clientId: undefined,
  clientSecret: undefined,
  scope: [],
  path: undefined
}

let tokens
let expires

/**
 * Configures the module with the following non-undefined properties found in {@param obj}:
 * port: Port to listen on for authorization (required, default: 8888).
 * clientId: Spotify client id (required).
 * clientSecret: Spotify client secret (required).
 * scope: Array of Spotify authorization scope strings (required, default: []).
 * path: Path to file where Spotify access and refresh tokens should be stored (optional).
 *
 * @param obj
 */
module.exports.config = obj => {
  if (obj.port) opts.port = obj.port
  if (obj.clientId) opts.clientId = obj.clientId
  if (obj.clientSecret) opts.clientSecret = obj.clientSecret
  if (obj.path) opts.path = obj.path
  if (obj.scope) opts.scope = obj.scope
}

/**
 * Gets a Spotify access token.
 * @returns {Promise<string[]>}
 */
module.exports.token = () => {
  // Checks if access and refresh tokens have been obtained and the access token is not expired
  if (tokens && (!expires && new Date().getTime() > expires)) return Promise.resolve([tokens.token, tokens.refresh])

  // Checks if access and refresh tokens have not been obtained, but there are tokens at a specified path
  if (!tokens && opts.path && fs.existsSync(opts.path)) {
    // Gets the tokens at the specified path
    tokens = JSON.parse(fs.readFileSync(opts.path))
  }

  // Refresh if tokens have been obtained, authorizes otherwise
  return (tokens ? refresh : authorize)()
}

/**
 * Authorizes with Spotify by temporarily setting up a local server
 * and sets the tokens variable.
 * @returns {Promise<string>}
 */
function authorize () {
  return new Promise(resolve => {
    // Creates a server with shutdown functionality
    const server = httpShutdown(http.createServer((req, res) => {
      // Gets query parameters
      const data = url.parse(req.url, true).query

      // Checks if the authentication code is in the query parameters
      if (data['code']) {
        res.writeHeader(200, {'Content-Type': 'text/html'})
        res.write('<html><head></head><body><script>close();</script></body></html>')

        // Will shut down server and get the authorization code
        res.end(() => server.shutdown(() => resolve(data['code'])))
      }
    }))

    // Server listens on port
    server.listen(opts.port, 'localhost', err => err
      ? console.log(err)
      : console.log('Listening on localhost:' + opts.port + '...')
    )

    // Opens the spotify authorization URL
    console.log('Auth URI: https://accounts.spotify.com/authorize?' + qs.stringify({
      client_id: opts.clientId,
      response_type: 'code',
      redirect_uri: callback(),
      scope: opts.scope.join(' ')
    }), {wait: false})
  // }).then(code => token({
  //   grant_type: 'authorization_code',
  //   code: code,
  //   redirect_uri: callback()
  })
}

/**
 * Refreshes the Spotify access token
 * and sets the tokens variable.
 * @returns {Promise<string>}
 */
function refresh () {
  // Refreshes the access token
  return token({
    grant_type: 'refresh_token',
    refresh_token: tokens.refresh
  })
}

function token (params) {
  return new Promise((resolve, reject) => {
    request({
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(opts.clientId + ':' + opts.clientSecret, 'utf8').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      qs: params
    }, (err, res, body) => {
      if (err) {
        reject(err)
      } else if (res.statusCode === 200) {
        body = JSON.parse(body)

        tokens = {
          token: body['access_token'],
          refresh: body['refresh_token'] ? body['refresh_token'] : tokens.refresh
        }

        expires = new Date().getTime() + body['expires_in']

        if (opts.path) {
          fs.writeFileSync(opts.path, JSON.stringify(tokens))
        }

        resolve([tokens.token, tokens.refresh])
      } else {
        reject(new Error(res.body))
      }
    })
  })
}

function callback () {
  return 'http://localhost:' + opts.port + '/callback'
}
