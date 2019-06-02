import logger from 'hoopa-logger'
import { ConversationContext } from 'node-nlp'
// Capabilities
import Speak from '../../communication'
import { DialogflowAgent } from '../../../services'
import processIntentType from '../../cognition/thinking'

const extractClassification = classifications =>
	classifications.reduce((prev, curr) =>
		Math.abs(curr.value - 1) < Math.abs(prev.value - 1) ? curr : prev
	)

const conversationHandler = async ({ content }, LanguageProcessor) => {
	const context = new ConversationContext()
	const { data: sentence } = JSON.parse(content)
	logger.info(`Conversation control: received ${content}`)
	// Local NLP analysis
	logger.info(`NLP Analysis locally for ${content}`)
	const localProcessedSentence = await LanguageProcessor.process(
		'en',
		sentence,
		context
	)
	const { answer, classifications } = localProcessedSentence
	const suggestedClassification = extractClassification(classifications)
	// Trigger intents
	if (suggestedClassification && suggestedClassification !== 'None') {
		processIntentType(suggestedClassification, sentence)

		if (answer) {
			return Speak(answer)
		}
		// Remote NLP from dialogflow if no local result
		const dialogflowResponse = await DialogflowAgent.processSentence(sentence)

		if (dialogflowResponse) {
			console.log(dialogflowResponse)
			return Speak(dialogflowResponse.fulfillmentText)
		}
	}

	return logger.error('Conversation handler service error')
}

export default conversationHandler
