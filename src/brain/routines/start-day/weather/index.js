import weather from 'weather-js'

const getWeatherInforamtion = (location) => {
  return new Promise((resolve, reject) => {
    weather.find({ search: 'Lisbon, PT', degreeType: 'C'}, (err, result) => {
      if(err) reject(err);
        
      resolve(result[0].current);
    });
  })
}

// const getYahooWeather 

export default getWeatherInforamtion