import logger from 'hoopa-logger'

const safeEmpty = (kind, defaultValue) => {
	logger.warning(`Property is empty ${kind}`)

	return defaultValue
}

export default safeEmpty
