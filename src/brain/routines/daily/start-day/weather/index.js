import weather from 'weather-js'
import giveWeatherAdvise from './utils'

const getWeatherInformation = (location = 'São Paulo, SP', degreeType = 'C') =>
	new Promise((resolve, reject) => {
		weather.find({ search: location, degreeType }, (err, result) => {
			if (err) reject(err)

			if (result) resolve(result[0].current)
		})
	})

export { getWeatherInformation, giveWeatherAdvise }
