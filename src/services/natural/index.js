import { BayesClassifier } from 'natural'
import logger from 'hoopa-logger'
import baseKnowledge from '../../brain/knowledge'

class NLP {
	constructor() {
		this.train()
	}

	train(newKnowledge = null) {
		logger.info('Cognitive analysis, basic  training...')
		this.bayes = new BayesClassifier()
		const trainingContext = baseKnowledge.natural

		if (newKnowledge) {
			newKnowledge.map(token => trainingContext.push(token))
		}

		trainingContext.map(token =>
			this.bayes.addDocument(token.input, token.class)
		)
		this.bayes.train()
		logger.info('Bayes training finished!')
	}

	classify(sentence) {
		const classification = this.bayes.classify(sentence)

		if (!classification)
			return "Sorry, but I don't understand what you've said."

		logger.info(`Sentence ${sentence} classified: --kind ${classification}`)

		return classification
	}
}

export default NLP
