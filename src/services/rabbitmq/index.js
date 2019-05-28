import amqp from 'amqplib/callback_api'
import logger from 'hoopa-logger'

const subscribeToChannel = (channelSubject, actionCallback) => {
	logger.info('Connecting to rabbitmq queue...')

	return amqp.connect(`amqp://${process.env.RABBIT_URL}:${process.env.RABBIT_PORT}`, (err, connection) => {
		if (err) {
			logger.error(`RabbitMQ | Connection error: ${err}`)
		}

		logger.info('Connection successfull!')

		logger.info('Opening channel...')
		connection.createChannel((error, channel) => {
			if (error) {
				logger.error(`RabbitMQ | Error creating channel: ${error}`)
			}

			logger.info(`Suscribed to ${channelSubject}`)
			channel.assertExchange(channelSubject, 'fanout', { durable: false })
			channel.assertQueue('', { exclusive: true }, (er, q) => {
				if (er) {
					logger.error(`RabbitMQ | Error assertQueue: ${error}`)
				}

				channel.bindQueue(q.queue, channelSubject, '')

				channel.consume(
					q.queue,
					msg => {
						logger.info(`${channelSubject} incoming message: ${msg.content.toString()}`)

						actionCallback(msg)
					},
					{ noAck: true }
				)
			})
		})
	})
}

const sendMessage = (channelSubject, message) => {
	logger.info('Connecting to rabbitmq queue...')

	return amqp.connect(`amqp://${process.env.RABBIT_URL}:${process.env.RABBIT_PORT}`, (err, connection) => {
		if (err) {
			return logger.error(`RabbitMQ | Connection error: ${err}`)
		}
		logger.info('Connection successfull!')

		const content = Buffer.from(message)

		logger.info('Opening channel...')

		return connection.createChannel((error, channel) => {
			if (error) {
				return logger.error(`RabbitMQ | Error opening channel: ${error}`)
			}

			logger.info('Channel opened!')
			channel.assertExchange(channelSubject, 'fanout', { durable: false })
			channel.publish(channelSubject, '', content)

			return logger.info(`${channelSubject} --message sent! --data: ${message}`)
		})
	})
}

export default {
	subscribeToChannel,
	sendMessage,
}
