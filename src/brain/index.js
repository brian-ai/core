// import nlp from 'compromise'
// import memory from './memory'
// import { conversation } from './actions';
import Brain from 'brain.js'
import baseKnowledge from './knowledge'
import { loadFeelings } from './routines'
import { serializer } from './utils'
import { train as runCongnitiveServices, classifySubjects } from './cognition'

const setup = async (LSTM = false) => {
  console.log('Initializing brain...')
  const network = new Brain.recurrent.LSTMTimeStep()
  await network.train(serializer.processTrainingData(baseKnowledge),  {
    learningRate: 0.3,    // scales with delta to effect training rate --> number between 0 and 1
    momentum: 0.1,        // scales with next layer's change value --> number between 0 and 1
    callback: null,       // a periodic call back that can be triggered while training --> null or function
    callbackPeriod: 10,   // the number of iterations through the training data between callback calls --> number greater than 0
    timeout: Infinity  
  })
  
  console.log('Neural network, basic training')
  
  return network
}

const init = async () => {
  const cortex = await setup()
  loadFeelings(cortex)
  runCongnitiveServices()
  console.log(classifySubjects('yesterday I ate eggs'))
}

init()
// loadKnowledgeBase()
// checkRoutines()

console.log('Hello, sir...')