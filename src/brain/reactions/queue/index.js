import logger from 'hoopa-logger'
import { ConversationContext } from 'node-nlp'
import Speak from '../../communication'
import IDontKnowThat from '../../cognition/comprehension'
import processIntentType from '../../cognition/thinking'

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
		await player.controls.startPlaylist(playlists[0], instance)

		return player.controls.setVoiceVolume(100, instance)
	}

	return logger.info(`Playlist service | end`)
}

const conversationHandler = async ({ content }, LanguageProcessor) => {
	logger.info(`Conversation control: received ${content}`)
	const context = new ConversationContext()
	const { data } = JSON.parse(content)
	const result = await LanguageProcessor.process('en', data, context)
	const { answer, classifications } = result

	const suggestedClassification = classifications.reduce((prev, curr) =>
		Math.abs(curr.value - 1) < Math.abs(prev.value - 1) ? curr : prev
	)
	if (suggestedClassification) processIntentType(suggestedClassification, data)

	if (!answer || suggestedClassification === 'None') {
		return IDontKnowThat(data)
	}

	if (answer) return Speak(answer)

	return logger.error('Conversation handler service error')
}

const weatherHandler = ({ content }) =>
	logger.info(`Weather control: received ${content}`)

export { playlistHandler, conversationHandler, weatherHandler }
