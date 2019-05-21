import record from 'node-record-lpcm16'
import { Detector, Models } from 'snowboy'
import logger from 'hoopa-logger'
import request from 'request'
import { RabbitMQ } from '../../../services'

const models = new Models()

// TODO: Improve model recognition with noise
models.add({
	file: `${__dirname}/models/Hey_Brian.pmdl`,
	sensitivity: '0.5',
	hotwords: 'hey brian'
})

// TODO: Study detector configs with more effort
const HotwordDetector = () => {
	const detector = new Detector({
		resource: 'node_modules/snowboy/resources/common.res',
		models,
		audioGain: 0.5,
		applyFrontend: true
	})

	detector.on('silence', () => {
		// console.log('silence')
	})

	detector.on('sound', () => {
		// Callback receives a <buffer>, which contains the last chunk of the audio that triggers the "sound"
		// event. It could be written to a wav stream.
		// logger.info('Hotword detector sound detected..')
	})

	detector.on('error', error => {
		logger.error(`Horword detection error: --error ${error}`)
	})

	detector.on('hotword', async (index, hotword) => {
		record.stop()
		// Callback receives a <buffer>, which contains the last chunk of the audio that triggers the "hotword"
		// event. It could be written to a wav stream. You will have to use it
		// together with the <buffer> in the "sound" event if you want to get audio
		// data after the hotword.
		logger.info(`hotword_detection_service | hotword ${hotword} detected`)

		const parseResult = (err, resp, body) => {
			const transcription = JSON.parse(body)

			/* eslint-disable no-underscore-dangle */
			return RabbitMQ.sendMessage(
				'conversation_service',
				` { "data": "${transcription._text}" }`
			)
		}

		// TODO: Improve request to wit system :)
		try {
			const requestConfig = {
				url: process.env.WIT_URL,
				headers: {
					Accept: 'application/vnd.wit.20160202+json',
					Authorization: `Bearer ${process.env.WIT_TOKEN}`,
					'Content-Type': 'audio/wav'
				}
			}

			record.start().pipe(await request.post(requestConfig, parseResult))
		} catch (error) {
			logger.error(error)
		}

		return HotwordDetector()
	})

	if (record) {
		const mic = record.start({
			threshold: 0,
			verbose: false
		})

		return mic.pipe(detector)
	}
	return logger.error('Error initializing hotword detection')
}

export default HotwordDetector
