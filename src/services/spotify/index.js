import SpotifyWebApi from 'spotify-web-api-node'
import auth from 'spotify-personal-auth'
import logger from 'hoopa-logger'
// Speaker Wrapper
import Speak from '../../brain/communication'

const loadBrianfy = async (access, refresh) => {
	const Brianfy = new SpotifyWebApi()
	Brianfy.setAccessToken(access)
	Brianfy.setRefreshToken(refresh)

	return Brianfy
}

/**
 * Handle spotify authorization flow
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

				return Speak(
					`Excuse me, Sir! But something went wrong when retrieving an access token from spotify! <break time="0.2s"/>
					You should teach me how to code so I could fix that for you <break time="0.2s"/>
					I'm pretty  sure that the problem is ${err.message}
				`
				)
			})
	})
}

const setVoiceVolume = async (amount = 30, instance) => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
		logger.info('Getting spotify credentials')
	}

	logger.info(`Setting volume to: ${amount}`)

	try {
		newInstance.setVolume(amount)
	} catch (error) {
		logger.error(`Spotify control service | volume error ${error}`)
	}
}

/**
 * Search for playlists into spotify library
 * @param {Brianfy} instance
 * @returns {Array} Playlists
 */
const findPlaylists = async (musicGenre = 'Jazz', instance) => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
		logger.info('Getting spotify credentials')
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
const startPlaylist = async (playlist, instance) => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
		logger.info('Getting spotify credentials')
	}
	await setVoiceVolume(50, newInstance)

	try {
		logger.info(`${playlist.name} started`)

		newInstance.play({
			context_uri: playlist.uri
		})
	} catch (error) {
		return logger.error(error)
	}

	return setVoiceVolume(100, newInstance)
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
	const spotifyApi = !(spotifyToken && spotifyToken.access)
		? await authorize()
		: loadBrianfy(spotifyToken.access, spotifyToken.refresh)

	return spotifyApi
}

export default Brianfy

export { authorize, findPlaylists, startPlaylist, setVoiceVolume }
