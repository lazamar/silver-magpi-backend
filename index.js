/* eslint-env node */
// Load environment variables
require('dotenv').config();

// Check environment variables:
const assert = require('assert');
assert(process.env.DOMAIN, 'No domain specified in .env file');
assert(process.env.DB_NAME, 'No database name specified in .env file');
assert(process.env.CONSUMER_KEY, 'No Twitter consumer key specified in .env file');
assert(process.env.CONSUMER_SECRET, 'No Twitter consumer secret specified in .env file');

module.exports = require('./server');
