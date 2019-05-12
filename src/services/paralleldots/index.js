import parallel from 'paralleldots'
import logger from 'hoopa-logger'

const API_KEY = process.env.PARALLEL_API_KEY

class ParallelDots {
	constructor() {
		this.parallel = parallel
		parallel.apiKey = API_KEY
	}

	sentimentAnalysis(sentence) {
		return this.parallel
			.sentiment(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	semanticAnalysis(sentence) {
		return this.parallel
			.semantic(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	emotionAnalysis(sentence) {
		return this.parallel
			.emotion(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	taxonomyAnalysis(sentence) {
		return this.parallel
			.taxonomy(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	extractorAnalysis(sentence) {
		return this.parallel
			.phraseExtractor(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	nplAnalysis(sentence) {
		return this.parallel
			.ner(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	abuse(sentence) {
		return this.parallel
			.abuse(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	textParser(sentence) {
		return this.parallel
			.textParser(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	phraseExtractor(sentence) {
		return this.parallel
			.phraseExtractor(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}

	checkUsage(sentence) {
		return this.parallel
			.usage(sentence)
			.then(response => response)
			.catch(error => logger.error(error))
	}
}

export default ParallelDots
