import { comprehension } from './cognition'

export const init = async () => {
  console.log('Hello, sir...')
  console.log(comprehension.classifySubjects('My name is Caio'))
}

init()