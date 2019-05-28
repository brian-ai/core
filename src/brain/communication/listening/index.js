import record from 'node-record-lpcm16'
import { Detector, Models } from 'snowboy'
import logger from 'hoopa-logger'
import request from 'request'
import { RabbitMQ } from '../../../services'

const models = new Models()

// TODO: Improve model recognition with noise
models.add({
	file: `${__dirname}/models/Hey_Brian.pmdl`,
	sensitivity: '.6',
	hotwords: 'hey brian',
})

// TODO: Study detector configs with more effort
const HotwordDetector = (restart = false) => {
	const detector = new Detector({
		resource: 'node_modules/snowboy/resources/common.res',
		models,
		audioGain: 0.5,
		applyFrontend: true,
	})

	detector.on('error', error => {
		record.stop()
		logger.error(`Horword detection error: --error ${error}`)

		return HotwordDetector(true)
	})

	detector.on('hotword', async (index, hotword) => {
		record.stop()
		logger.info(`hotword_detection_service | hotword ${hotword} detected, stop recording`)

		const requestConfig = {
			url: process.env.WIT_URL,
			headers: {
				Accept: 'application/vnd.wit.20160202+json',
				Authorization: `Bearer ${process.env.WIT_TOKEN}`,
				'Content-Type': 'audio/wav',
			},
		}

		/* eslint-disable no-underscore-dangle */
		const parseResult = async (err, resp, body) => {
			record.stop()
			const transcription = JSON.parse(body)
			logger.info(`stt_service | Data analysis complete --transcription ${transcription._text}`)

			RabbitMQ.sendMessage('conversation_service', ` { "data": "${transcription._text}" }`)

			setTimeout(() => HotwordDetector(true), 1000)
		}

		// TODO: Improve request to wit system :)
		try {
			logger.info(`stt_service | analyzing voice data...`)

			record.start().pipe(await request.post(requestConfig, parseResult))
		} catch (error) {
			logger.error(error)
		}
	})

	if (restart) {
		record.stop()
	}

	if (record) {
		logger.info(`hotword_detection_service | ${restart ? 'Restarting' : 'initializing'} recording...`)
		const mic = record.start({
			threshold: 0,
			verbose: false,
		})

		return mic.pipe(detector)
	}

	return logger.error('Error initializing hotword detection')
}

export default HotwordDetector
