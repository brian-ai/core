import { GREETING } from '../knowledge'
import { getWeatherInformation } from '../../services'

const sayHi = (name) => GREETING(name)
const talkAboutWeather = (userLocation = null) => getWeatherInformation(userLocation)


export {
  sayHi,
  talkAboutWeather,
};