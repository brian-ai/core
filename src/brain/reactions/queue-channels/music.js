import logger from 'hoopa-logger'
import maxBy from 'lodash.maxby'
import Speak from '../../communication'

const greetings = [
	'Hi There!',
	'Hi muchacho!',
	'Hellooow there!',
	`What's up?!`
]

const startSong = async ({ data, options }, { player, instance }, term) => {
	const choosedSong = maxBy(data, 'popularity')

	if (choosedSong.name) {
		const songGreeting = greetings[Math.floor(Math.random() * greetings.length)]
		const artist = choosedSong.artists[0].name
		await player.controls.setVoiceVolume(50, instance)

		const playSentence = `${songGreeting}. I've found a song related to ${term} from ${artist}, check it out...`

		await Speak(playSentence)

		if (options.play) {
			return player.controls.startPlaylist(choosedSong, instance, 'song')
		}
	}

	return logger.info(`Music service | end`)
}

const musicHandler = async ({ player, instance }, { content }) => {
	let contentToPlay
	const greeting = greetings[Math.floor(Math.random() * greetings.length)]
	const playlistObject = JSON.parse(content)
	const options =
		typeof playlistObject.options === 'string'
			? JSON.parse(playlistObject.options)
			: playlistObject.options || {}
	const smartSearchResult = await player.smartSearch(
		playlistObject.data,
		instance
	)
	const results = smartSearchResult.data.length
	const { data } = playlistObject

	if (smartSearchResult.type === 'playlists') {
		contentToPlay =
			smartSearchResult.data[
				Math.floor(Math.random() * smartSearchResult.data.length)
			] || player[0]
	} else {
		return startSong(
			{ data: smartSearchResult.data, options },
			{ player, instance },
			data
		)
	}

	const sentence = `${greeting} I've found ${results} playlists related to ${data}`

	await player.controls.setVoiceVolume(50, instance)
	await Speak(sentence)

	logger.info(`Music service | ${data} | results: ${results}`)

	if (options.play) {
		const playSentence = `Now playing ${data} songs..`

		await Speak(playSentence)
		await player.controls.startPlaylist(contentToPlay, instance)

		player.controls.setVoiceVolume(100, instance)
	}

	return logger.info(`Music service | end`)
}

export default musicHandler
