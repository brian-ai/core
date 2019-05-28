import rethinkly, { retrieveData } from 'rethinkly'
import { feelings } from './feelings'
import NaturalElements from './natural-sentences'

const getInstance = () => {
	const dbConfig = {
		host: process.env.RETHINKDB_URL,
		port: process.env.RETHINKDB_PORT,
		db: process.env.DB_NAME,
	}

	return rethinkly(dbConfig)
}

const baseKnowledge = {
	feelings,
	natural: NaturalElements,
	instance: { getInstance, retrieveData },
}

export default baseKnowledge
