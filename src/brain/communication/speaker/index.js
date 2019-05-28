import AWS from 'aws-sdk'
import Speaker from 'speaker'
import logger from 'hoopa-logger'

const Polly = new AWS.Polly({
	signatureVersion: 'v4',
	region: 'us-east-1',
})

const createSentence = sentence => {
	const Text = `
		<speak>
			<amazon:effect vocal-tract-length="+5%">
				<amazon:auto-breaths>
					${sentence}
				</amazon:auto-breaths>
			</amazon:effect>
		</speak>
	`

	return {
		Text,
		OutputFormat: 'pcm',
		TextType: 'ssml',
		VoiceId: 'Brian',
	}
}

const speak = phrase =>
	new Promise((resolve, reject) => {
		Polly.synthesizeSpeech(createSentence(phrase), (err, res) => {
			if (err || !(res.AudioStream instanceof Buffer)) {
				reject(err || 'Not is a buffer')
			}
			const speaker = new Speaker({
				channels: 1,
				bitDepth: 16,
				sampleRate: 17650,
			})

			speaker.on('open', () => {
				logger.info('Speaker opened')
			})

			speaker.on('close', () => {
				logger.info('Speaker closed')
				resolve()
			})

			try {
				speaker.write(Buffer.from(res.AudioStream), () => {
					setTimeout(() => speaker.close(), 700)
				})
			} catch (error) {
				logger.error(`Error opening speaker: ${error}`)
			}
		})
	})

export default speak
