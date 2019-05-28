import logger from 'hoopa-logger'
import { ConversationContext } from 'node-nlp'
import Speak from '../../communication'
import IDontKnowThat from '../../cognition/comprehension'
import processIntentType from '../../cognition/thinking'

const conversationHandler = async ({ content }, LanguageProcessor) => {
	logger.info(`Conversation control: received ${content}`)
	const context = new ConversationContext()
	const { data } = JSON.parse(content)
	const result = await LanguageProcessor.process('en', data, context)
	const { answer, classifications } = result

	const suggestedClassification = classifications.reduce((prev, curr) =>
		Math.abs(curr.value - 1) < Math.abs(prev.value - 1) ? curr : prev
	)
	if (suggestedClassification) processIntentType(suggestedClassification, data)

	if (!answer || suggestedClassification === 'None') {
		return IDontKnowThat(data)
	}

	if (answer) return Speak(answer)

	return logger.error('Conversation handler service error')
}

export default conversationHandler
