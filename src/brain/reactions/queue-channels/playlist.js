import logger from 'hoopa-logger'
import Speak from '../../communication'

const playlistHandler = async ({ player, instance }, { content }) => {
	const greeting = [
		'Hi There!',
		'Hi muchacho!',
		'Hellooow there!',
		`What's up?!`
	]

	const playlistObject = JSON.parse(content)
	const options =
		typeof playlistObject.options === 'string'
			? JSON.parse(playlistObject.options)
			: playlistObject.options || {}
	const playlists = await player.findPlaylists(playlistObject.data, instance)
	const choosedPlaylist =
		playlists[Math.floor(Math.random() * playlists.length)] || player[0]
	const results = playlists.length
	const { data } = playlistObject

	const sentence = `${
		greeting[Math.floor(Math.random() * greeting.length)]
	} I've found ${results} playlists related to ${data}`

	await player.controls.setVoiceVolume(50, instance)
	await Speak(sentence)

	logger.info(`Playlist service | ${data} | results: ${results}`)

	if (options.play) {
		const playSentence = `Now playing ${data} songs..`

		await Speak(playSentence)
		await player.controls.startPlaylist(choosedPlaylist, instance)

		player.controls.setVoiceVolume(100, instance)
	}

	return logger.info(`Playlist service | end`)
}

export default playlistHandler
