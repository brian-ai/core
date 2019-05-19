// Reactions to Queue(Stimulus)
import {
	playlistHandler,
	conversationHandler,
	weatherHandler
} from './reactions/queue'
// Knowledge
import Memory from './memory'
// Routines Controller
import Routines from './routines'
// Services
import { RabbitMQ, player, NLP } from '../services'

const Subscriber = (SYSTEM_DATA, LanguageProcessor) => {
	const channels = [
		{
			channel: 'playlist_service',
			callback: msg => playlistHandler({ player, core: { SYSTEM_DATA } }, msg)
		},
		{
			channel: 'conversation_service',
			callback: msg => conversationHandler(msg, LanguageProcessor)
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

const init = async () => {
	const SYSTEM_DATA = await Memory.getSystemMemory()
	const { LanguageProcessor, Bayes } = NLP
	NLP.trainModel(null, Bayes, LanguageProcessor)
	Subscriber(SYSTEM_DATA, LanguageProcessor)
	Routines(player)
}

init()
