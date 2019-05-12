import logger from 'hoopa-logger'
// import { CronJob } from 'cron'
import Speak from './communication'
import { startDay } from './routines'
import { player } from '../services'
import Memory from './memory'

// const dailyJob = new CronJob('00 20 8 * * 1-5', async function() {
const dailyJob = async () => {
	/*
	 * Runs every week days
	 * at 6:00:00 AM.
	 */
	const SYSTEM_DATA = await Memory.getSystemMemory()
	const Brianfy = await player.Brianfy(SYSTEM_DATA)

	logger.info('Loading spotify playlists...')
	const playlists = await player.findPlaylists(Brianfy)
	const playlistNumber = Math.floor(Math.random() * (playlists.length - 1))

	await player.controls.setVoiceVolume(Brianfy, 50)

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
}

/* eslint-disable import/prefer-default-export */
export const init = async () => {
	dailyJob()
}

init()
