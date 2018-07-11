require = require("esm")(module)
const emotions = require('./brain/knowledge/emotions')
const input = 'We love potatos!'

console.log(`Feeling analysis for: ${input}`, emotions.analyzeFeeling(input))