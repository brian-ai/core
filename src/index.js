/* eslint-disable no-global-assign */
require('dotenv').config()
require = require('esm')(module)
const { init } = require('./brain')

module.exports = init()
