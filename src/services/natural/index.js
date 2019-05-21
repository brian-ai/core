import { BayesClassifier } from 'natural'
import { NlpManager } from 'node-nlp'
import logger from 'hoopa-logger'
import baseKnowledge from '../../brain/knowledge'

const NLP = {
	Bayes: new BayesClassifier(),
	LanguageProcessor: new NlpManager({ languages: 'en' }),
	trainModel: (newKnowledge = null, bayes, manager) => {
		logger.info('Cognitive analysis, basic  training...')
		const trainingContext = baseKnowledge.natural

		if (newKnowledge) {
			newKnowledge.map(token => trainingContext.push(token))
		}

		trainingContext.map(token => {
			manager.addDocument('en', token.input, token.class)
			if (token.answer) {
				manager.addAnswer('en', token.class, token.answer)
			}

			return bayes.addDocument(token.input, token.class)
		})
		logger.info('Bayes training finished!')
	},

	classify: (sentence, Bayes) => {
		const classification = Bayes.classify(sentence)

		if (!classification) return "Sorry, but I don't understand what you've said."

		logger.info(`Sentence ${sentence} classified: --kind ${classification}`)

		return classification
	}
}

export default NLP
