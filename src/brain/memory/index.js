/* eslint-disable */
import baseKnowledge from '../knowledge'

class Memory {
	async getSystemMemory() {
		const config = await baseKnowledge.instance.retrieveData(
			await baseKnowledge.instance.getInstance(),
			'config'
		)
		const roles = await baseKnowledge.instance.retrieveData(
			await baseKnowledge.instance.getInstance(),
			'roles'
		)
		const people = await baseKnowledge.instance.retrieveData(
			await baseKnowledge.instance.getInstance(),
			'people'
		)

		return { config, roles, people }
	}
}

export default Memory
