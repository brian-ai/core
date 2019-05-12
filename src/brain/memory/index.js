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

const Memory = {
	getSystemMemory: async () => {
		const config = await getShred('config', 'Config')
		const roles = await getShred('roles', 'Roles')
		const people = await getShred('people', 'People')
		const providers = await getShred('providers', 'Providers')
		const tokens = await getShred('tokens', 'Tokens')

		logger.info('System main memory loaded')

		return { config, roles, people, providers, tokens }
	}
}

export default Memory
