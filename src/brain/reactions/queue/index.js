import logger from 'hoopa-logger'
import Speak from '../../communication'
import IDontKnowThat from '../../cognition/comprehension'
import processIntentType from '../../cognition/thinking'

const playlistHandler = async ({ player }, { content }) => {
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
	const playlists = await player.findPlaylists(playlistObject.data)
	const results = playlists.length
	const { data } = playlistObject

	const sentence = `
		<speak>
			<amazon:effect vocal-tract-length="+5%">
				<amazon:auto-breaths>
					${greeting[Math.floor(Math.random() * greeting.length)]}
					I've found ${results} playlists related to ${data}
				</amazon:auto-breaths>
			</amazon:effect>
		</speak>
	`
	await Speak(sentence, player)

	logger.info(`Playlist service | ${data} | results: ${results}`)

	if (options.play) {
		const playSentence = `
	        <speak>
	            <amazon:effect vocal-tract-length="+5%">
	                <amazon:auto-breaths>Now playing ${data} songs...</amazon:auto-breaths>
	            </amazon:effect>
	        </speak>
	    `
		await Speak(playSentence, player)

		await player.controls.startPlaylist(playlists[0])
	}
}

const conversationHandler = async ({ content }, LanguageProcessor, player) => {
	logger.info(`Conversation control: received ${content}`)
	const { data } = JSON.parse(content)

	const { answer, classifications } = await LanguageProcessor.process('en', data)

	const suggestedClassification = classifications.reduce((prev, curr) =>
		Math.abs(curr.value - 1) < Math.abs(prev.value - 1) ? curr : prev
	)
	if (suggestedClassification) processIntentType(suggestedClassification, data)

	if (!answer && !suggestedClassification) {
		return IDontKnowThat(data, player)
	}

	if (answer) {
		const sentence = `
				<speak>
					<amazon:effect vocal-tract-length="+5%">
						<amazon:auto-breaths>${answer}</amazon:auto-breaths>
					</amazon:effect>
				</speak>
			`

		return Speak(sentence, player)
	}

	return logger.error('Conversation handler service error')
}

const weatherHandler = ({ content }) =>
	logger.info(`Weather control: received ${content}`)

export { playlistHandler, conversationHandler, weatherHandler }
