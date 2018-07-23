import { Voice } from './communication'
import { startDay } from './routines'

export const init = async () => {
  // Daily routine one, scratch 2
  const dayInformation = await startDay()
  Voice.speak(dayInformation)
}

init()