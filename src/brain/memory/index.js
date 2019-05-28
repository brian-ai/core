import logger from 'hoopa-logger'
import baseKnowledge from '../knowledge'
import { safeEmpty } from '../utils'

const getMemoryShred = async (table, label) => {
	const data = await baseKnowledge.instance.retrieveData(await baseKnowledge.instance.getInstance(), table)

	logger.info(`${label} loaded`)

	return data
}

const Memory = {
	getSystemMemory: async () => {
		const config = (await getMemoryShred('config', 'Config')) || safeEmpty('config', {})
		const roles = (await getMemoryShred('roles', 'Roles')) || safeEmpty('roles', [])
		const people = (await getMemoryShred('people', 'People')) || safeEmpty('people', [])
		const providers = (await getMemoryShred('providers', 'Providers')) || safeEmpty('providers', [])
		const tokens = (await getMemoryShred('tokens', 'Tokens')) || safeEmpty('tokens', [])

		logger.info('System main memory loaded')

		return { config, roles, people, providers, tokens }
	},
}

export default Memory
