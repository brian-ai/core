import SpotifyWebApi from'spotify-web-api-node'
import auth from 'spotify-personal-auth';

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
      console.log(
        'Something went wrong when retrieving an access token',
        err.message
      );
    })
  })
}

const Brianfy = async () => {
  const spotifyApi = await authorize()

  return spotifyApi
}


export default Brianfy
