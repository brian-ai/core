// import nlp from 'compromise'
// import memory from './memory'
// import { conversation } from './actions';
import Brain from 'brain.js'
import trainingData from './knowledge/training-data'
import { serializer } from './knowledge/utils'

const setup = () => {
  const network = new Brain.NeuralNetwork()
  network.train(serializer.processTrainingData(trainingData))
  
  return network
}

export {
  setup,
}