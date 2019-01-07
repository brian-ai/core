import { Voice } from './communication'
import { startDay } from './routines'
import { Brianfy } from '../services'
import { CronJob } from 'cron'
// import auth from 'spotify-personal-auth';

let playlists = []
let musicPlayer = {}

const loadSpotifySongs = () => {
  return new Promise(async (resolve, reject) => {
    const brianfy = await Brianfy()
    musicPlayer = brianfy
    brianfy.searchPlaylists('Morning Jazz').then((data) => {
        const searchResult = data.body.playlists
        playlists = searchResult.items
        
        resolve(musicPlayer)
    }, (error) => {
        Voice.speak(
          `<speak>
            <amazon:auto-breaths>
              Excuse me Sir, but something went wrong with your spotify! <break time="0.2s"/>
              You should teach me to code, that way I could fix that for you <break time="0.2s"/>
              I'm pretty  sure that the problem is ${error}
            </amazon:auto-breaths>
          </speak>`
        )

        reject(error)
      }
    )
  })    
}

// const playListControl = new CronJob('00 57 8 * * 1-5', async function() {
const startPlaylist = (playlist) => {
  /*
  * Runs every week days
  * at 5:00:00 AM.
  */  
  setTimeout(() => {
    try {
      musicPlayer.play({
        context_uri: playlist.uri
      })
    } catch (e) {
      console.log(e)
    }
  }, 700)
}

// const dailyJob = new CronJob('00 20 8 * * 1-5', async function() {
const dailyJob = async () => {
  /*
  * Runs every week days
  * at 6:00:00 AM.
  */
 
  // First of all, lets cache some songs
  const playlistNumber = Math.floor(Math.random() * (playlists.length - 0 + 1)) + 0;
  await loadSpotifySongs()
  // Loading daily useful information
  const dayInformation = await startDay()
  
  Voice.speak(dayInformation)
    .then(() => {
      Voice.speak(`
        <speak>
          <amazon:auto-breaths>
            I'll play a few songs for you sir!
            <break time="1s"/> Playing ${playlists[playlistNumber].name} from spotify! <emphasis level="reduced">enjoy!</emphasis>
            <break time="1s"/> 
          </amazon:auto-breaths>
        </speak>`
      )
      .then(() => startPlaylist(playlists[playlistNumber]))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}
    // playListControl.start()
//   }, function () {
//     /* This function is executed when the job stops */
//     console.log('Daily job executed')
//   },
//   true, /* Start the job right now */
// )

export const init = async () => {
  dailyJob()
}

init()