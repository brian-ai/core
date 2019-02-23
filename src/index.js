/* eslint-disable no-global-assign */
const dotenv = require('dotenv')
require = require('esm')(module)

dotenv.load()

module.exports = require('./brain')
