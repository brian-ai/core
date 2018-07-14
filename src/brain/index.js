// import nlp from 'compromise'
// import memory from './memory'
// import { conversation } from './actions';
import Brain from 'brain.js'
import trainingData from './knowledge/training-data'
import { serializer } from './knowledge/utils'
import { train as runCongnitiveServices, classifySubjects } from './cognition'

const setup = async (LSTM = false) => {
  console.log('Initializing brain...')
  const network = new Brain.NeuralNetwork()
  await network.train(serializer.processTrainingData(trainingData))
  
  console.log('Neural network, basic training')
  
  return network
}

setup()
runCongnitiveServices()
console.log(classifySubjects('yesterday I ate eggs'))
// loadKnowledgeBase()
// checkRoutines()

console.log('Hello, sir...')