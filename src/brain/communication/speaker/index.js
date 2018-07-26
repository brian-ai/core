import AWS from 'aws-sdk'
import { Readable } from 'stream'
import Speaker from 'speaker'

const speaker = new Speaker({
  channels: 1,
  bitDepth: 16,
  sampleRate: 17350
})

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1',
})

const createSentence = (sentence) => ({
  'Text': sentence,
  'OutputFormat': 'pcm',
  'TextType': 'ssml',
  'VoiceId': 'Brian',
});

const speak = async (phrase, nextStep) => {
  await Polly.synthesizeSpeech(createSentence(phrase), function(err, res) {
    if (err) {
      console.log('err', err)
    } else if (res && res.AudioStream instanceof Buffer) {
      try {
        let bufferStream = new Readable
        let start = 0
        const bufferLength = 255
        
        do {
          const piece = res.AudioStream.slice(start, bufferLength)
          bufferStream.push(piece)
          start += bufferLength
        }
        while (res.AudioStream.length < bufferLength);

        bufferStream.pipe(speaker)
          .on('end', () => {
            console.log('xpto')
          })
      } catch (err) {
        console.error(err)
      }
    }
  })
}

export {
  speak
} 