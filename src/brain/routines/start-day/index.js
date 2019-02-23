import moment from 'moment'
import { getWeatherInformation, giveWeatherAdvise } from './weather'
import getGreetingTime from '../utils'
import { getRouteToWork } from '../../../services'

/**
 * startDay
 * @memberof routines
 * The start day routine should run as a scheduled service to
 * provide useful information as first interaction with Brian
 */
const startDay = async () => {
	const { temperature, skytext } = await getWeatherInformation()
	const trafficInformation = await getRouteToWork()
	const { distance, name, formattedTime } = trafficInformation
	const timePieces = formattedTime.split(':')

	const minutes = +timePieces[0] * 60 + +timePieces[1]
	const greetingObject = getGreetingTime(moment())
	const weatherAdvise = giveWeatherAdvise(temperature, greetingObject.humanizedTime)

	return `
    <speak>
      <amazon:effect vocal-tract-length="+5%">
        ${greetingObject.sentence}!
        <break time="200ms"/> Now it's ${temperature} degrees and it's <emphasis level="moderate">${skytext}</emphasis>, ${weatherAdvise}}.
        <p>Have a lovely ${greetingObject.humanizedTime}!</p>
        <break time="200ms"/>
        <p>You should get about of ${minutes} minutes to work by ${name}, the whole path is ${distance} kilometers</p>
        
        </amazon:auto-breaths>
      </amazon:effect>
    </speak>`
}

export default startDay
