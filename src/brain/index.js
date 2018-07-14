// import nlp from 'compromise'
// import memory from './memory'
// import { conversation } from './actions';
import Brain from 'brain.js'
import trainingData from './knowledge/training-data'
import { serializer } from './knowledge/utils'

export class BriansBrain {
  constructor() {
    this.neuralNet = new Brain.NeuralNetwork()
    this.neuralNet.train(serializer.processTrainingData(trainingData))
    
    this.neuralNet
  }
}

new BriansBrain()