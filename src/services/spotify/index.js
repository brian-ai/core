import SpotifyWebApi from 'spotify-web-api-node'
import auth from 'spotify-personal-auth'
import logger from 'hoopa-logger'
// Speaker Wrapper
import Voice from '../../brain/communication'

/**
 * Write spotify tokens based on the spotify
 * authorization flow
 */
const authorize = () => {
	logger.info('Authorizing spotify...')

	auth.config({
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		scope: [
			'user-read-playback-state',
			'user-modify-playback-state',
			'user-top-read'
		],
		path: './tokens'
	})

	return new Promise((resolve, reject) => {
		auth
			.token()
			.then(([token, refresh]) => {
				try {
					const Brianfy = new SpotifyWebApi()
					Brianfy.setAccessToken(token)
					Brianfy.setRefreshToken(refresh)

					logger.info('Brianfy configured!')
					resolve(Brianfy)
				} catch (err) {
					logger.info('Authorization error...')

					reject(err)
				}
			})
			.catch(err => {
				logger.info(err.message)

				return Voice.speak(
					`<speak>
						<amazon:auto-breaths>
							Excuse me, Sir! But something went wrong when retrieving an access token from spotify! <break time="0.2s"/>
							You should teach me how to code so I could fix that for you <break time="0.2s"/>
							I'm pretty  sure that the problem is ${err.message}
						</amazon:auto-breaths>
					</speak>`
				)
			})
	})
}

const setVoiceVolume = async (instance, amount = 30) => {
	logger.info(`Setting volume to: ${amount}`)

	return instance.setVolume(amount)
}

/**
 * Search for playlists into spotify library
 * @param {Brianfy} instance
 * @returns {Array} Playlists
 */
const findPlaylists = instance =>
	new Promise(async (resolve, reject) => {
		instance.searchPlaylists('Sam Smith').then(
			data => {
				const searchResult = data.body.playlists
				const playlists = searchResult.items

				resolve(playlists)
			},
			error => {
				logger.error(error)

				reject(error)
			}
		)
	})

/**
 * Start a playlist into a desired player
 * @param {Brianfy} instance
 * @param {Object} playlist
 */
const startPlaylist = async (instance, playlist) => {
	try {
		logger.info(`${playlist.name} started`)

		return instance.play({
			context_uri: playlist.uri
		})
	} catch (error) {
		logger.error(error)
	}

	return setVoiceVolume(instance, 100)
}

/**
 * Creates an spotifyApi instance
 * @returns spotifyApi
 */
const Brianfy = async () => {
	const spotifyApi = await authorize()

	return spotifyApi
}

export default Brianfy

export { findPlaylists, startPlaylist, setVoiceVolume }
