const encode = (arg) => arg.split('').map(x => (x.charCodeAt(0) / 255))

const processTrainingData = (data) =>
  data.map(d => {
    return {
      input: encode(d.input),
      output: d.output,
    }
  }
)

export {
  encode,
  processTrainingData,
}