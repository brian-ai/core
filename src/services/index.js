import NLP from './natural'
import getRouteToWork from './location'
import Brianfy, {
	findPlaylists,
	setVoiceVolume,
	startPlaylist
} from './spotify'
import RabbitMQ from './rabbitmq'

const player = {
	Brianfy,
	controls: {
		setVoiceVolume,
		startPlaylist
	},
	findPlaylists
}

export { RabbitMQ, NLP, getRouteToWork, player }
