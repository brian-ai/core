import AWS from 'aws-sdk'
import Speaker from 'speaker'
import { ReadableStreamBuffer } from 'stream-buffers'

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

const createSentence = (sentence) => ({
  'Text': sentence,
  'OutputFormat': 'pcm',
  'TextType': 'ssml',
  'VoiceId': 'Brian',
})

const speak = (phrase) => {
  return new Promise((resolve, reject) => {
    Polly.synthesizeSpeech(createSentence(phrase), function(err, res) {
      if (err || !res.AudioStream instanceof Buffer) {
          reject(err || 'Not is a buffer')
      }
      const speaker = Speaker({
        channels: 1,
        bitDepth: 16,
        sampleRate: 17650
      })
      let speakerBuffer = new ReadableStreamBuffer({
        frequency: 10,   // in milliseconds.
      });

      speakerBuffer.put(res.AudioStream)
      speakerBuffer.on('end', () => {
        speaker.close()
        resolve()
      })
      speakerBuffer
        .pipe(speaker)
    })
  })
}

export {
  speak
}