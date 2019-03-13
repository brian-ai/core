const rdb = require('rethinkdb');

const rethinkConfig = {
	host: process.env.DB_URL,
	port: process.env.DB_PORT,
	db: process.env.DB_NAME,
}

const connect = async () => rdb.connect(rethinkConfig).then(connection => connection)

const processResults = results => results

const getData = async (connection, tableName, id = null) => {
	if (!id) {
		return rdb
			.table(tableName)
			.run(connection)
			.then(cursor => cursor
				.toArray((err, results) => {
					if (err) throw err;

					processResults(results);
				}))
	}

	return rdb
		.table(tableName)
		.get(id)
		.run(connection)
		.then(result => result)
}

export {
	rdb,
	getData,
	connect,
}
