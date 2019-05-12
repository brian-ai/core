import ParallelDots from './paralleldots'
import Natural from './natural'
import getRouteToWork from './location'
import Brianfy, {
	findPlaylists,
	setVoiceVolume,
	startPlaylist
} from './spotify'

const player = {
	Brianfy,
	controls: {
		setVoiceVolume,
		startPlaylist
	},
	findPlaylists
}

export { ParallelDots, Natural, getRouteToWork, player }
