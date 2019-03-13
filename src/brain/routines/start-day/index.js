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
	const { sentence: timeSentence, humanizedTime } = getGreetingTime(moment())
	const weatherAdvise = giveWeatherAdvise(temperature, humanizedTime)

	return `
    <speak>
      <amazon:effect vocal-tract-length="+5%">
        ${timeSentence}!
        <break time="200ms"/>
        Now it's ${temperature} degrees and it's ${skytext}, ${weatherAdvise}. Have a lovely ${humanizedTime}!
        <break time="300ms"/>
        
        <p>
          And remember that you are on a day off today sir.
          <emphasis level="moderate">Please, rest.</emphasis>
          You need to recharge
        </p>
        
        </amazon:auto-breaths>
      </amazon:effect>
    </speak>`
}

export default startDay

// eslint-disable-next-line max-len
// <p>You should get about of ${minutes} minutes to work by ${name}, the whole path is ${distance} kilometers</p>
