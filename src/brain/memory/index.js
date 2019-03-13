/* eslint-disable */
import { getFirebaseKnowledge } from '../knowledge'
import { Brianfy, rethinkdb } from '../../services'

class Memory {
	constructor() {
		this.connection = null
	}
	
	async getConnection() {
		if (!this.connection) {
			this.connection = await rethinkdb.connect()

			return this.connection
		}
		
		return this.connection
	}

	async getRoles() {
		const connection = await this.getConnection()
		const roles = await rethinkdb.getData(connection, 'roles')

		return roles
	}

	async getUsers() {
		const connection = await this.getConnection()
		const people = await rethinkdb.getData(connection, 'people')

		return people
	}
}

export default Memory
