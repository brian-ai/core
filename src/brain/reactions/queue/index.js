import logger from 'hoopa-logger'
import Speak from '../../communication'
import { analyseSentence } from '../../cognition/comprehension'

const greeting = ['Hi There!', 'Hi muchacho!', 'Hellooow there!', `What's up?!`]

const playlistHandler = async ({ player, Brianfy }, { content }) => {
	const playlistObject = JSON.parse(content)
	const options = JSON.parse(playlistObject.options) || {}
	const playlists = await player.findPlaylists(Brianfy, playlistObject.data)
	const results = playlists.length
	const { data } = playlistObject

	player.controls.setVoiceVolume(Brianfy, 50)

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

		await player.controls.startPlaylist(Brianfy, playlists[0])
	}
}

const conversationHandler = async ({ content }) => {
	analyseSentence(content)

	logger.info(`Conversation control: received ${content}`)
}

const weatherHandler = ({ content }) =>
	logger.info(`Weather control: received ${content}`)

export { playlistHandler, conversationHandler, weatherHandler }
