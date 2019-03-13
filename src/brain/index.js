import { CronJob } from 'cron'
import speak from './communication'
import { startDay } from './routines'
import { Brianfy } from '../services'
import Memory from './memory'
// import auth from 'spotify-personal-auth';

let playlists = []
let musicPlayer = {}
const memory = new Memory()

const loadSpotifySongs = () => new Promise(async (resolve, reject) => {
	const brianfy = await Brianfy()
	musicPlayer = brianfy
	brianfy.searchPlaylists('Morning Jazz').then(
		(data) => {
			const searchResult = data.body.playlists
			playlists = searchResult.items

			resolve(musicPlayer)
		},
		(error) => {
			speak()

			reject(error)
		},
	)
})

const loadRoles = async () => {
	const roles = await memory.getRoles()

	return roles
}

const loadUsers = async () => {
	const users = await memory.getUsers()

	return users
}
// const playListControl = new CronJob('00 57 8 * * 1-5', async function() {
const startPlaylist = (playlist) => {
	/*
	 * Runs every week days
	 * at 5:00:00 AM.
	 */
	try {
		musicPlayer.play({
			context_uri: playlist.uri,
		})
	} catch (e) {
		console.log(e)
	}
}

// const dailyJob = new CronJob('00 00 7 * * 1-5', async () => {
const dailyJob = async () => {
	console.log('Here roles', await loadRoles())
	console.log('Here users', await loadUsers())

	// /*
	//  * Runs every week days
	//  * at 5:00:00 AM.
	//  */

	// // First of all, lets cache some songs
	// const playlistNumber = Math.floor(Math.random() * playlists.length) + 1
	// await loadSpotifySongs()
	// // Loading daily useful information
	// const dayInformation = await startDay()

	// speak(dayInformation)
	// 	.then(() => {
	// 		speak(`
	// 			<speak>
	// 				<amazon:auto-breaths>
	// 				I'll play a few songs for you sir!
	// 				<break time="1s"/> Playing ${playlists[playlistNumber].name} from spotify! 
	// <emphasis level="reduced">enjoy!</emphasis>
	// 				<break time="1s"/>
	// 				</amazon:auto-breaths>
	// 			</speak>`)
	// 			.then(() => startPlaylist(playlists[playlistNumber]))
	// 			.catch(err => console.log(err))
	// 	})
	// 	.catch(err => console.log(err))
// })
}

/* eslint-disable import/prefer-default-export */
export const init = async () => {
	dailyJob()
}

init()
