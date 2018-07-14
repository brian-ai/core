import Brain from 'brain.js'
import trainingData from './training-data'
import { serializer } from './utils'

const MISSUNDERSTOOD_FEELING = `Sorry, but I don't understand what you've said.`

const config = {
  errorThresh: 0.005,  
  iterations: 200,  
  log: true,
  logPeriod: 10, 
  learningRate: 0.3
}

const BrianNeuralNet = new Brain.recurrent.LSTM()

const analyzeFeelingFromText = input => {
  console.log(trainingData)
  console.log('--Analyzing feelings for: ', input)
  console.log('--Running neural train...')
  BrianNeuralNet.train(serialize(trainingData), config)
  
  console.log('--Neural network output: ', BrianNeuralNet.run(serializer.encode(input)))

  if (!encode(input)) return BrianNeuralNet.run(encode(MISSUNDERSTOOD_FEELING))
  
  return BrianNeuralNet.run(encode(input))
}

export {
  analyzeFeelingFromText
}
