import logger from 'hoopa-logger'
import { CronJob } from 'cron'
// Capabilities
import Speak from './communication'
import {
	playlistHandler,
	conversationHandler,
	weatherHandler
} from './reactions/queue'
// Knowledge
import { startDay } from './routines'
import Memory from './memory'
// Services
import { RabbitMQ, player } from '../services'

let SYSTEM_DATA
let Brianfy

const dailyJob = new CronJob('00 30 5 * * 1-5', async () => {
	/*
	 * Runs every week days
	 * at 5:30:00 AM.
	 */
	const playlists = await player.findPlaylists(Brianfy)
	const playlistNumber = Math.floor(Math.random() * (playlists.length - 1))

	player.controls.setVoiceVolume(Brianfy, 50)

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

const Subscriber = () => {
	RabbitMQ.subscribeToChannel('playlist_service', msg =>
		playlistHandler({ player, Brianfy, core: { SYSTEM_DATA } }, msg)
	)
	RabbitMQ.subscribeToChannel('conversation_service', msg =>
		conversationHandler(msg)
	)
	RabbitMQ.subscribeToChannel('weather_service', msg => weatherHandler(msg))
}

const init = async () => {
	SYSTEM_DATA = await Memory.getSystemMemory()
	Brianfy = await player.Brianfy(SYSTEM_DATA)
	Subscriber()

	dailyJob.start()
	// dailyJob()

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
