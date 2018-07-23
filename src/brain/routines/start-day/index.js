import getWeatherInformation from './weather'
import { getRouteToWork } from '../../../services'


const giveWeatherAdvise = (temp = 18) => {
  if (parseFloat(temp) < 20) return `You should get a coach, I unfortunatelly can't warm you yet.`
  if (parseFloat(temp) >= 20) return `You should be okay, today is warm, enjoy the heat!`
    
  return 'Have a nice day, Sir!'
  
}
// This routine consist in provide some healthy information to start the day,
const startDay = async () => {
  const { temperature, skytext } = await getWeatherInformation()
  const trafficInformation = await getRouteToWork()
  const { distance, formattedTime, name } = trafficInformation
  var timePieces = formattedTime.split(':'); // split it at the colons

  // Hours are worth 60 minutes.
  var minutes = (+timePieces[0]) * 60 + (+timePieces[1]);
  
  return `Good Morning Sir! Now it's making ${temperature} degrees and it's ${skytext}. ${giveWeatherAdvise(temperature)}.
    \n If you go by car, you should take ${minutes} minutes to arrive at work. The estimated distance is ${distance} kilometers.`
}

export default startDay