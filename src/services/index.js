import NLP from './natural'
import getRouteToWork from './location'
import {
	findPlaylists,
	authorize,
	setVoiceVolume,
	startPlaylist
} from './spotify'
import RabbitMQ from './rabbitmq'

const player = {
	instance: {
		authorize
	},
	controls: {
		setVoiceVolume,
		startPlaylist
	},
	findPlaylists
}

export { RabbitMQ, NLP, getRouteToWork, player }
