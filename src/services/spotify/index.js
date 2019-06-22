import SpotifyWebApi from 'spotify-web-api-node'
import auth from 'spotify-personal-auth'
import maxBy from 'lodash.maxby'
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

const analyzePopularity = items =>
	Math.max(
		...items.map(o => {
			return o.popularity
		})
	)

/**
 * Search for playlists into spotify library
 * @param {Brianfy} instance
 * @returns {Array} Playlists
 */
const smartSearch = async (query = 'Cooking Jazz', instance) => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
		logger.info('Getting spotify credentials')
	}

	logger.info('Spotify Smart Search...')

	return new Promise(async (resolve, reject) =>
		newInstance.search(query, ['track', 'playlist']).then(
			data => {
				const searchResult = data.body
				const playlists = searchResult.playlists.items
				const tracks = searchResult.tracks.items
				const tracksAveragePopularity = analyzePopularity(tracks)
				const mostPopularTrack = maxBy(tracks, 'popularity')

				if (
					tracksAveragePopularity > 75 ||
					mostPopularTrack.name.toLowerCase().includes(query)
				) {
					resolve({ data: tracks, type: 'tracks' })
				}

				resolve({ data: playlists, type: 'playlists' })
			},
			error => {
				logger.error(error)

				reject(error)
			}
		)
	)
}

/**
 * Start a playlist into a desired player
 * @param {Brianfy} instance
 * @param {Object} playlist
 */
const startPlaylist = async (playlist, instance, type = 'playlist') => {
	let newInstance = instance
	if (!instance) {
		newInstance = await authorize()
		logger.info('Getting spotify credentials')
	}

	let options = {
		context_uri: playlist.uri
	}
	if (type === 'song') {
		options = {
			uris: [playlist.uri]
		}
	}

	newInstance
		.play({
			...options
		})
		.catch(error => logger.error(error))

	logger.info(`${playlist.name} started`)

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

export { authorize, findPlaylists, startPlaylist, smartSearch, setVoiceVolume }
