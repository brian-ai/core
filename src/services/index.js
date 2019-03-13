import ParallelDots from './paralleldots'
import Natural from './natural'
import getRouteToWork from './location'
import Brianfy from './spotify'
import { rdb, getData, connect } from './rethink'

const rethinkdb = {
	connect,
	instance: rdb,
	getData,
}

export {
	ParallelDots, Natural, getRouteToWork, Brianfy, rethinkdb,
}
