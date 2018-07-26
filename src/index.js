const dotenv = require('dotenv');
require = require("esm")(module)
const Voice = require('./brain/communication/speaker')
const { init } = require('./brain')

Voice.speak(`
  <speak>
   Fuck this shit
  </speak>`
)
dotenv.load();

module.exports = require('./brain')