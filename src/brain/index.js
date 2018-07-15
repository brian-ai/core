import { comprehension } from './cognition'
import { saveMasterInfo, loadBriansBrain } from './routines'

const  sentence = 'Hey, Brian! Where the united states is?'

export const init = async () => {
  console.log('Hello, sir...')
  loadBriansBrain('memories')
  
  // const data = await comprehension.textParser(sentence)
  // saveMasterInfo('test', { name: 'Test Model' } )
  // console.log(comprehension.classifySubjects(sentence))
}

init()