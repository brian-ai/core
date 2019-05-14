import SpotifyWebApi from 'spotify-web-api-node'
import auth from 'spotify-personal-auth'
import logger from 'hoopa-logger'
// Speaker Wrapper
import Voice from '../../brain/communication'

const loadBrianfy = (access, refresh) => {
	const Brianfy = new SpotifyWebApi()
	Brianfy.setAccessToken(access)
	Brianfy.setRefreshToken(refresh)

	return Brianfy
}

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
					logger.info('Brianfy loaded!')

					resolve(loadBrianfy(token, refresh))
				} catch (err) {
					logger.info('Brianfy, authorization error...')

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
const findPlaylists = async (instance, musicGenre = 'Jazz') => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
	}

	logger.info('Loading spotify playlists...')

	return new Promise(async (resolve, reject) => {
		newInstance.searchPlaylists(musicGenre).then(
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
}

/**
 * Start a playlist into a desired player
 * @param {Brianfy} instance
 * @param {Object} playlist
 */
const startPlaylist = async (instance, playlist) => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
	}

	await setVoiceVolume(newInstance, 50)

	try {
		logger.info(`${playlist.name} started`)

		newInstance.play({
			context_uri: playlist.uri
		})
	} catch (error) {
		return logger.error(error)
	}

	return setVoiceVolume(newInstance, 100)
}

/**
 * Creates an spotifyApi instance
 * @returns spotifyApi
 */
const Brianfy = async SYSTEM_DATA => {
	const spotifyID = SYSTEM_DATA.providers.find(
		providerObj => providerObj.slug === 'spotify'
	).id
	const spotifyToken = SYSTEM_DATA.tokens.find(
		tokenObj => tokenObj.provider === spotifyID
	)
	const spotifyApi = spotifyToken.access
		? await authorize()
		: loadBrianfy(spotifyToken.access, spotifyToken.refresh)

	return spotifyApi
}

export default Brianfy

export { authorize, findPlaylists, startPlaylist, setVoiceVolume }
