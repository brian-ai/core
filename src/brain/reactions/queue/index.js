import logger from 'hoopa-logger'
import Speak from '../../communication'
import IDontKnowThat from '../../cognition/comprehension'

const playlistHandler = async ({ player }, { content }) => {
	const greeting = [
		'Hi There!',
		'Hi muchacho!',
		'Hellooow there!',
		`What's up?!`
	]
	const playlistObject = JSON.parse(content)
	const options = JSON.parse(playlistObject.options) || {}
	const playlists = await player.findPlaylists(playlistObject.data)
	const results = playlists.length
	const { data } = playlistObject

	player.controls.setVoiceVolume(50)

	await Speak(`
	    <speak>
	        <amazon:effect vocal-tract-length="+5%">
	            <amazon:auto-breaths>
                    ${greeting[Math.floor(Math.random() * greeting.length)]}
                    I've found ${results} playlists related to ${data}
	            </amazon:auto-breaths>
	        </amazon:effect>
	    </speak>
	`)

	logger.info(`Playlist service | ${data} | results: ${results}`)

	if (options.play) {
		await Speak(`
	        <speak>
	            <amazon:effect vocal-tract-length="+5%">
	                <amazon:auto-breaths>Now playing ${data} songs...</amazon:auto-breaths>
	            </amazon:effect>
	        </speak>
	    `)

		await player.controls.startPlaylist(playlists[0])
	}
}

const conversationHandler = async ({ content }, LanguageProcessor) => {
	logger.info(`Conversation control: received ${content}`)
	const { data } = JSON.parse(content)

	const { answer } = await LanguageProcessor.process('en', data)

	if (!answer) {
		return IDontKnowThat(data)
	}

	return Speak(`
	    <speak>
	        <amazon:effect vocal-tract-length="+5%">
	            <amazon:auto-breaths>
                    ${answer}
	            </amazon:auto-breaths>
	        </amazon:effect>
	    </speak>
	`)
	// analyseSentence(content)
}

const weatherHandler = ({ content }) =>
	logger.info(`Weather control: received ${content}`)

export { playlistHandler, conversationHandler, weatherHandler }
