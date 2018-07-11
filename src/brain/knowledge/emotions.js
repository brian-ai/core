import Brain from 'brain.js'
import trainingData from './training-data'
import { serialize, encode } from './utils/serializer'

const BrianNeuralNet = new Brain.recurrent.RNN()

const analyzeFeeling = input => {
  console.log(input)
  BrianNeuralNet.train(serialize(trainingData))
  BrianNeuralNet.train(serialize(trainingData))
  
  return BrianNeuralNet.run(encode(input))
}

export {
  analyzeFeeling
}
