import rethinkly, { retrieveData } from 'rethinkly'
import { feelings } from './feelings'
import NaturalElements from './natural-sentences'

const getInstance = () => {
	const dbConfig = {
		host: process.env.DB_URL,
		port: process.env.DB_PORT,
		db: process.env.DB_NAME
	}

	return rethinkly(dbConfig)
}

const baseKnowledge = {
	feelings,
	natural: NaturalElements,
	instance: { getInstance, retrieveData }
}

export default baseKnowledge
