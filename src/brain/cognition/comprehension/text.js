import { NLP } from '../../../services'

const classifySubjects = sentence => {
	const { classify, LanguageProcessor } = NLP
	classify(sentence, LanguageProcessor)
}

export default classifySubjects
