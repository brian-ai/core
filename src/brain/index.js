import logger from 'hoopa-logger'
import { CronJob } from 'cron'
// Capabilities
import Speak from './communication'
// Knowledge
import { startDay } from './routines'
import Memory from './memory'
// Services
import { player } from '../services'

let SYSTEM_DATA
let Brianfy

const dailyJob = new CronJob('00 30 5 * * 1-5', async () => {
	// const dailyJob = async () => {
	/*
	 * Runs every week days
	 * at 5:30:00 AM.
	 */
	const playlists = await player.findPlaylists(Brianfy)
	const playlistNumber = Math.floor(Math.random() * (playlists.length - 1))

	player.controls.setVoiceVolume(Brianfy, 50)

	logger.info('Loading daily information...')
	const dayInformation = await startDay()

	Speak(dayInformation)
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
				.then(() =>
					player.controls.startPlaylist(Brianfy, playlists[playlistNumber])
				)
				.catch(err => logger.error(err))
		})
		.catch(err => logger.error(err))
})

const init = async () => {
	SYSTEM_DATA = await Memory.getSystemMemory()
	Brianfy = await player.Brianfy(SYSTEM_DATA)

	dailyJob.start()

	/* eslint-disable no-underscore-dangle */
	logger.info(
		`Job scheduled, time to start ${(
			dailyJob._timeout._idleTimeout / 60
		).toFixed(2)} mins`
	)

	setInterval(
		() =>
			logger.info(
				`Job scheduled, time to start ${(
					dailyJob._timeout._idleTimeout / 60
				).toFixed(2)} mins`
			),
		30000
	)
}

init()
