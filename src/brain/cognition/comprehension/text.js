import { ParallelDots, NLP } from '../../../services'

const Parallel = new ParallelDots()

const extractRelevance = async sentence => Parallel.extractorAnalysis(sentence)

const extractKeywords = async sentence => Parallel.keywords(sentence)

const extractEmotion = sentence => Parallel.emotionAnalysis(sentence)

const extractSentiment = sentence => Parallel.sentimentAnalysis(sentence)

const IsAbusiveInformation = sentence => Parallel.abuse(sentence)

const phraseExtractor = sentence => Parallel.phraseExtractor(sentence)

const textParser = sentence => Parallel.textParser(sentence)

const classifySubjects = sentence => new NLP().classify(sentence)

export {
	extractKeywords,
	extractRelevance,
	extractEmotion,
	extractSentiment,
	IsAbusiveInformation,
	textParser,
	phraseExtractor,
	classifySubjects
}
