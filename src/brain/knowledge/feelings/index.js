/* eslint-disable */
import Brain from 'brain.js'
import { hapiness, sadness } from './data'

const activeNetwork = async (LSTM = false) => {
	console.log('Initializing brain...')
	const network = new Brain.recurrent.LSTMTimeStep()
	await network.train(serializer.processTrainingData(baseKnowledge), {
		momentum: 0.1,
		callback: null,
		callbackPeriod: 10,
		timeout: Infinity,
	})

	return network
}

const feelings = [...new Set(hapiness, sadness)]

export { feelings, activeNetwork }
