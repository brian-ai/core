import natural from 'natural'
import logger from 'hoopa-logger'
import baseKnowledge from '../../brain/knowledge'

class Natural {
	constructor() {
		this.Bayes = new natural.BayesClassifier()
		this.train()
	}

	train(newKnowledge = null) {
		logger.info('Cognitive analysis, basic  training...')
		const { Bayes } = this
		const trainingContext = baseKnowledge.natural

		if (newKnowledge) {
			newKnowledge.map(token => trainingContext.push(token))
		}

		trainingContext.map(token => Bayes.addDocument(token.input, token.class))
		Bayes.train()
	}

	classify(sentence) {
		const { Bayes } = this
		const classification = Bayes.classify(sentence)

		if (!classification)
			return "Sorry, but I don't understand what you've said."

		return `I think that when you're saying ${sentence} this means a ${classification}`
	}
}

export default Natural
