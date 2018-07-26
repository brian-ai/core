import { Voice } from './communication'
import { startDay } from './routines'
import { Brianfy } from '../services'
import { CronJob } from 'cron'

let playlists = []
let musicPlayer = {}

const loadSpotifySongs = () => {
  return new Promise(async (resolve, reject) => {
    const configuredBrianfy = await Brianfy()
    console.log('Seting up spotify env...')
    configuredBrianfy.searchPlaylists('Morning Jazz').then((data) => {
        const searchResult = data.body.playlists
        console.log(`Found ${searchResult.items.length} playlists`)

        console.log(searchResult.items[0].name)
        playlists = searchResult.items
        musicPlayer = configuredBrianfy
        
        resolve(musicPlayer)
    }, (error) => {
        Voice.speak(
          `<speak>
            <amazon:auto-breaths>
              Excuse me Sir, but something went wrong with your spotify! <break time="0.2s"/>
              You should teach to code, that way I could fixed that for you <break time="0.2s"/>
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
const playListControl = () => {
  /*
  * Runs every week days
  * at 7:01:00 AM.
  */
//  <speak>
//       <amazon:auto-breaths>
//         I'll play a few songs for you, sir!
//         <break time="1s">Playing ${playlists[0].name} from spotify for you sir!, enjooy!
//       </amazon:auto-breaths>
//     </speak>
  Voice.speak(`
    <speak>
      <amazon:auto-breaths>
        I'll play a few songs for you sir!
        <break time="1s"/> Playing ${playlists[0].name} from spotify! <emphasis level="reduced">enjooy!</emphasis>
      </amazon:auto-breaths>
    </speak>`
  )

  // console.log(playlists[0])

  // musicPlayer.play({
  //   context_uri: playlists[0].tracks.uri,
  //   device_id: '7c7853c44ac0380a575d109080e4e7cadd54ca51'
  // }).then(data =>  console.log(data))
  //   .catch(error =>  console.log(error))
// }, function () {
  /* This function is executed when the job stops */
    // console.log('Playlist job executed') 
  // },
  // true, /* Start the job right now */
}

const dailyJob = new CronJob('00 56 13 * * 1-5', async function() {
    /*
    * Runs every week days
    * at 10:06:00 AM.
    */

    // First of all, lets cache some songs
    await loadSpotifySongs()
    // Loading daily useful information
    const dayInformation = await startDay()
    
    Voice.speak(dayInformation)
    setTimeout(() => {
      playListControl()
    }, 1000)
    // playListControl.start()
  }, function () {
    /* This function is executed when the job stops */
    console.log('Daily job executed')
  },
  true, /* Start the job right now */
)

export const init = async () => {
  // Daily routine one, scratch 2
  dailyJob.start()
  // // await loadSpotifySongs()
  // const dayInformation = await startDay()
  // Voice.speak(dayInformation)
}

init()