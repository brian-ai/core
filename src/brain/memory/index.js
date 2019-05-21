import logger from 'hoopa-logger'
import baseKnowledge from '../knowledge'

const getShred = async (table, label) => {
	const data = await baseKnowledge.instance.retrieveData(
		await baseKnowledge.instance.getInstance(),
		table
	)

	logger.info(`${label} loaded`)

	return data
}

const isEmpty = (kind, defaultValue) => {
	logger.warning(`Property is empty ${kind}`)

	return defaultValue
}

const Memory = {
	getSystemMemory: async () => {
		const config = (await getShred('config', 'Config')) || isEmpty('config', {})
		const roles = (await getShred('roles', 'Roles')) || isEmpty('roles', [])
		const people = (await getShred('people', 'People')) || isEmpty('people', [])
		const providers = (await getShred('providers', 'Providers')) || isEmpty('providers', [])
		const tokens = (await getShred('tokens', 'Tokens')) || isEmpty('tokens', [])

		logger.info('System main memory loaded')

		return { config, roles, people, providers, tokens }
	}
}

export default Memory
