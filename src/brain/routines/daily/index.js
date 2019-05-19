import logger from 'hoopa-logger'
// Capabilities
import Speak from '../../communication'
// Methods
import startDay from './start-day'
// Helpers
import Scheduler from '../helpers'

export default async (cronTime = '00 30 5 * * 1-5', jobName, player) => {
	Scheduler(cronTime, 'Daily Job', async () => {
		/*
		 * Runs every week days
		 * at 5:30:00 AM.
		 */
		const playlists = await player.findPlaylists('Jazz')
		const playlistNumber = Math.floor(Math.random() * (playlists.length - 1))

		player.controls.setVoiceVolume(50)

		const dayInformation = await startDay()

		return Speak(dayInformation)
			.then(() => {
				Speak(`
				<speak>
					<amazon:auto-breaths>
						I'll play a few songs for you Sir!
						<break time="1s"/> Playing ${playlists[playlistNumber].name}
						from spotify! <emphasis level="reduced">enjoy!</emphasis>
						<break time="1s"/>
					</amazon:auto-breaths>
				</speak>`)
					.then(() => player.controls.startPlaylist(playlists[playlistNumber]))
					.catch(err => logger.error(err))
			})
			.catch(err => logger.error(err))
	})
}
