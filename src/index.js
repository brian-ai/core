const dotenv = require('dotenv');
require = require("esm")(module)
 
dotenv.load();

module.exports = require('./brain')