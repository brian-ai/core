// Reactions to Queue(Stimulus)
import {
	playlistHandler,
	conversationHandler,
	weatherHandler
} from './reactions/queue-channels'
// Knowledge
import Memory from './memory'
// Routines Controller
import Routines from './routines'
// Services
import { RabbitMQ, player, NLP } from '../services'
import HotwordDetector from './communication/listening'

const Subscriber = async (SYSTEM_DATA, LanguageProcessor, Brianfy) => {
	const channels = [
		{
			channel: 'playlist_service',
			callback: msg =>
				playlistHandler({ player, instance: Brianfy, core: { SYSTEM_DATA } }, msg)
		},
		{
			channel: 'conversation_service',
			callback: msg =>
				conversationHandler(msg, LanguageProcessor, { player, instance: Brianfy })
		},
		{
			channel: 'weather_service',
			callback: msg => weatherHandler(msg)
		}
	]

	return channels.map(({ channel, callback }) =>
		RabbitMQ.subscribeToChannel(channel, callback)
	)
}

export const init = async () => {
	const Brianfy = await player.instance.authorize()
	const SYSTEM_DATA = await Memory.getSystemMemory()
	const { LanguageProcessor, Bayes } = NLP

	NLP.trainModel(null, Bayes, LanguageProcessor)
	Subscriber(SYSTEM_DATA, LanguageProcessor, Brianfy)
	Routines(player, Brianfy)

	HotwordDetector()
}

export default init
