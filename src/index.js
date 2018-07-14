const dotenv = require('dotenv');
require = require("esm")(module)

console.log('Loading Brian environment variables...')
dotenv.load();

module.exports = require('./brain')