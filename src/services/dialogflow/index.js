import dialogflow from 'dialogflow'
import uuid from 'uuid'

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
const processSentence = async (text, projectId = 'brian-b9b6e') => {
	// A unique identifier for the given session
	const sessionId = uuid.v4()

	// Create a new session
	const sessionClient = new dialogflow.SessionsClient()
	const sessionPath = sessionClient.sessionPath(projectId, sessionId)

	// The text query request.
	const request = {
		session: sessionPath,
		queryInput: {
			text: {
				// The query to send to the dialogflow agent
				text,
				// The language used by the client (en-US)
				languageCode: 'en-US'
			}
		}
	}

	const responses = await sessionClient.detectIntent(request)
	const { queryText, fulfillmentText, intent } = responses[0].queryResult

	return {
		queryText,
		fulfillmentText,
		intent
	}
	// console.log(`  Query: ${result.queryText}`)
	// console.log(`  Response: ${result.fulfillmentText}`)
	// if (result.intent) {
	// 	console.log(`  Intent: ${result.intent.displayName}`)
	// } else {
	// 	console.log(`  No intent matched.`)
	// }
}

const Agent = {
	processSentence
}

export default Agent
