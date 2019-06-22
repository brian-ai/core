import NLP from './natural'
import getRouteToWork from './location'
import {
	findPlaylists,
	authorize,
	setVoiceVolume,
	startPlaylist,
	smartSearch
} from './spotify'
import RabbitMQ from './rabbitmq'
import DialogflowAgent from './dialogflow'

const player = {
	instance: {
		authorize
	},
	controls: {
		setVoiceVolume,
		startPlaylist
	},
	findPlaylists,
	smartSearch
}

export { RabbitMQ, DialogflowAgent, NLP, getRouteToWork, player }
