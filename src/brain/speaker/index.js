import AWS from 'aws-sdk'
import Stream from 'stream'
import Speaker from 'speaker'

const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
})

const createSentence = (sentence, fromError = false) => ({
  'Text': sentence,
  'OutputFormat': 'pcm',
  'VoiceId': 'Amy'
});

const getPlayer = () => new Speaker({
    channels: 1,
    bitDepth: 16,
    sampleRate: 16000
})

const speak = (phrase) => {
  return Polly.synthesizeSpeech(createSentence(phrase), function(err, res) {
    if (err) {
        console.log('err', err)
    } else if (res && res.AudioStream instanceof Buffer) {
        try {
          let bufferStream = new Stream.PassThrough()
          bufferStream.end(res.AudioStream)
          bufferStream.pipe(getPlayer());
        } catch (err) {
          console.error(err);
        }
    }
  })
}

export {
  speak
}