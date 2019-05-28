import logger from 'hoopa-logger'

const weatherHandler = ({ content }) =>
	logger.info(`Weather control: received ${content}`)

export default weatherHandler
