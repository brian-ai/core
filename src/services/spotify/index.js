import SpotifyWebApi from'spotify-web-api-node'
import auth from './auth';

const authorize = () => {
  auth.config({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    scope: ['user-modify-playback-state', 'user-top-read'], // Replace with your array of needed Spotify scopes
    path: '../tokens' // Optional path to file to save tokens (will be created for you)
  })
  
  return new Promise((resolve, reject) => {
    auth.token()
    .then(([token, refresh]) => {
        try {
          const Brianfy = new SpotifyWebApi()
          console.log(`Token found in name of jesus: ${token}`)
          Brianfy.setAccessToken(token)
          Brianfy.setRefreshToken(refresh) 
          
          resolve(Brianfy)
        } catch (err) {
          reject(err)
        }
    })
    .catch(err => {
      Voice.speak(
        `<speak>
          <amazon:auto-breaths>
            Excuse me, Sir! But something went wrong when retrieving an access token from spotify! <break time="0.2s"/>
            You should teach me how to code so I could fix that for you <break time="0.2s"/>
            I'm pretty  sure that the problem is ${err.message}
          </amazon:auto-breaths>
        </speak>`
      )
    })
  })
}

const Brianfy = async () => {
  const spotifyApi = await authorize()

  return spotifyApi
}


export default Brianfy
