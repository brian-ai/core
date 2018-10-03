import SpotifyWebApi from'spotify-web-api-node'

// Credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://www.example.com/callback',
  scope: 'user-modify-playback-state'
})

const authorize = () => {
  return new Promise((resolve, reject) => {
    spotifyApi.clientCredentialsGrant()
    .then((data) => {
        try {
          console.log(`Token found: ${data.body['access_token']}`)
          spotifyApi.setAccessToken(data.body['access_token'])
          // refreshSpotifyToken.start()   
          resolve(spotifyApi)
        } catch (err) {
          reject(err)
        }
    })
    .catch(err => {
      console.log(
        'Something went wrong when retrieving an access token',
        err.muser-modify-playback-stateessage
      );
    })
  })
}

const Brianfy = async () => {
  const spotifyApi = await authorize()

  return spotifyApi
}


export default Brianfy
