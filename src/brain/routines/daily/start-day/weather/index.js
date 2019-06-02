import DarkSky from 'dark-sky'

const getWeatherInformation = async (location = [39.193, -188.134]) => {
	const DarkSkyAPI = new DarkSky(process.env.DARKSKY_API)

	return DarkSkyAPI.options({
		latitude: location[0],
		longitude: location[1],
		units: 'si',
		language: 'en'
	})
		.get()
		.then(({ currently, daily }) => ({
			getTemperature: () => currently.temperature,
			getSmartInfo: () => daily.summary
		}))
}

export default getWeatherInformation
