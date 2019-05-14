import amqp from 'amqplib/callback_api'
import logger from 'hoopa-logger'

const subscribeToChannel = (channelSubject, actionCallback) => {
	logger.info('Connecting to rabbitmq queue...')

	return amqp.connect('amqp://localhost:32772', (err, connection) => {
		logger.info('Connection successfull!')
		if (err) {
			logger.error(`RabbitMQ | Connection error: ${err}`)
		}

		logger.info('Opening channel...')
		connection.createChannel((error, channel) => {
			if (error) {
				logger.error(`RabbitMQ | Error creating channel: ${error}`)
			}

			logger.info('Channel opened!')
			channel.assertExchange(channelSubject, 'fanout', { durable: false })
			channel.assertQueue('', { exclusive: true }, (er, q) => {
				if (er) {
					logger.error(`RabbitMQ | Error assertQueue: ${error}`)
				}

				channel.bindQueue(q.queue, channelSubject, '')

				channel.consume(
					q.queue,
					msg => {
						logger.info(`Received: ${msg.content.toString()}`)

						actionCallback(msg)
					},
					{ noAck: true }
				)
			})
		})
	})
}

export default {
	subscribeToChannel
}
