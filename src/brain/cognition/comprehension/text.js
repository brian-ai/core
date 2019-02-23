import { ParallelDots, Natural } from '../../../services'

const Parallel = new ParallelDots()
const NPL = new Natural()

const extractRelevance = sentence => Parallel.extractorAnalysis(sentence)

const extractEmotion = sentence => Parallel.emotionAnalysis(sentence)

const extractSentiment = sentence => Parallel.sentimentAnalysis(sentence)

const IsAbusiveInformation = sentence => Parallel.abuse(sentence)

const phraseExtractor = sentence => Parallel.phraseExtractor(sentence)

const textParser = sentence => Parallel.textParser(sentence)

const classifySubjects = sentence => NPL.classify(sentence)

export {
	extractRelevance,
	extractEmotion,
	extractSentiment,
	IsAbusiveInformation,
	textParser,
	phraseExtractor,
	classifySubjects,
}
