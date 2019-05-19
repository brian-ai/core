import logger from 'hoopa-logger'
import { getWeatherInformation, giveWeatherAdvise } from './weather'
import getGreetingTime from '../../utils'
import { getRouteToWork } from '../../../../services'

const sayWorkRoute = ({ minutes, name, distance }) =>
	`<p>You should get about of ${minutes} minutes to work by ${name}, the whole path is ${distance} kilometers</p>`
/**
 * startDay
 * @memberof routines
 * The start day routine should run as a scheduled service to
 * provide useful information as first interaction with Brian,
 */
const startDay = async () => {
	const { temperature, skytext } = await getWeatherInformation()
	const trafficInformation = await getRouteToWork()
	const { distance, name, formattedTime } = trafficInformation
	const timePieces = formattedTime.split(':')

	const minutes = +timePieces[0] * 60 + +timePieces[1]
	const greetingObject = getGreetingTime()
	const weatherAdvise = giveWeatherAdvise(
		temperature,
		greetingObject.humanizedTime
	)
	const isWeekend = new Date().getDay() % 6 === 0
	const route = {
		minutes,
		name,
		distance
	}

	logger.info('Loaded daily information...')

	return `
    <speak>
      <amazon:effect vocal-tract-length="+5%">
        ${greetingObject.sentence}!
        <break time="200ms"/> Now it's ${temperature} degrees and it's ${skytext}, ${weatherAdvise}}.
        <p>Have a lovely ${greetingObject.humanizedTime}!</p>
        <break time="200ms"/>
        ${!isWeekend ? sayWorkRoute(route) : ''}
        
        </amazon:auto-breaths>
      </amazon:effect>
    </speak>`
}

export default startDay
