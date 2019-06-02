import logger from 'hoopa-logger'
import publicIp from 'public-ip'
import geoip from 'geoip-lite'
// Helpers
import getWeatherInformation from './weather'
import getGreetingTime from '../../utils'
// Capabilities
import Speak from '../../../communication'
/**
 * startDay
 * @memberof routines
 * The start day routine should run as a scheduled service to
 * provide useful information as first interaction with Brian,
 */
const startDay = async () => {
	const currentIP = await publicIp.v4()
	const location = await geoip.lookup(currentIP)
	const weatherInformation = await getWeatherInformation(location.ll)
	const temperature = weatherInformation.getTemperature()
	const smartWeatherInfo = weatherInformation.getSmartInfo()
	const greetingObject = getGreetingTime()
	const now = new Date()
	const timeOptions = { hour: '2-digit', minute: '2-digit' }
	const humanizedNow = now.toLocaleTimeString('en-US', { ...timeOptions })
	const weekday = now.toLocaleDateString('en-US', { weekday: 'long' })

	logger.info('Daily useful information loaded!')

	return Speak(`
		<p>${greetingObject.sentence}!</p>
		<p>It's ${humanizedNow} and the weather in ${location.city} is 
		${Math.round(temperature)}°C with ${smartWeatherInfo}</p>

		<p>Have a lovely ${weekday}!</p>
		<break time="200ms"/>
	`)
}

export default startDay
