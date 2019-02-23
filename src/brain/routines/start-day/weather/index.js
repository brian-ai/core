import weather from 'weather-js'
import { giveWeatherAdvise } from './utils'

const getWeatherInformation = (location) => {
  return new Promise((resolve, reject) => {
    weather.find({ search: 'São Paulo, SP', degreeType: 'C'}, (err, result) => {
      if(err) reject(err);

      if (result) resolve(result[0].current);
    });
  })
}

export { getWeatherInformation, giveWeatherAdvise }