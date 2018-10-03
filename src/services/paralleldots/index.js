import parallel from 'paralleldots'

const API_KEY = process.env.PARALLEL_API_KEY;

class ParallelDots {
  constructor() {
    this.parallel = parallel
    parallel.apiKey = API_KEY
  }

  sentimentAnalysis(sentence) {
    return this.parallel.sentiment(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }

  semanticAnalysis(sentence) {
    return this.parallel.semantic(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }

  emotionAnalysis(sentence) {
    return this.parallel.emotion(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }

  taxonomyAnalysis(sentence) {
    return this.parallel.taxonomy(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }
  
  extractorAnalysis(sentence) {
    return this.parallel.phraseExtractor(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }

  nplAnalysis(sentence) {
    return this.parallel.ner(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }

  abuse(sentence) {
    return this.parallel.abuse(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }

  textParser(sentence) {
    return this.parallel.textParser(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }
 
  phraseExtractor(sentence) {
    return this.parallel.phraseExtractor(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }
 
  checkUsage(sentence) {
    return this.parallel.usage(sentence)
      .then((response) => response)
      .catch((error) => console.info(error))
  }
}

export default ParallelDots
