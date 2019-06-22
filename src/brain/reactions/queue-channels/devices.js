import logger from 'hoopa-logger'
// Capabilities

const devicesHandler = async ({ player, instance }) => {
	logger.info('Devices handler started, checking current devices family...')

	try {
		const {
			body: { devices }
		} = await player.getAvailableDevices(instance)

		return devices
	} catch (error) {
		return logger.error('Devices handler error')
	}
}

export default devicesHandler
