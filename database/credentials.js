/* eslint-disable camelcase */
const dbDriver = require('./driver');

let db;
const dbName = process.env.DB_NAME;
let credentialsCol; // Credentials collection

// NOTE: This initialisation takes some time, but the code does not
// enforce waiting for it. For now it is not expected to create problems,
// but it must be done propperly later.

// Load database
dbDriver.getDatabase(dbName)
  .then(d => (db = d))
  // Load collections
  .then(() => dbDriver.getCollection(db, 'credentials'))
  .then(col => (credentialsCol = col));

module.exports = {};

/**
 * Save credentials
 * @method save
 * @param  {Object}
 * @return {Promise<void>} resolved when the record is successfully saved.
 */
module.exports.save = ({
  oauth_token,
  oauth_token_secret,
  user_id,
  screen_name,
  access_request_token,
 }) => {
  const record = {
    key: oauth_token,
    secret: oauth_token_secret,
    user_id,
    screen_name,
    access_request_token,
  };

    // Save key and password in the database
  return dbDriver.insert(credentialsCol, record)
    .then(() => console.log(`Credentials for ${screen_name} saved successfully`))
    .catch(err => console.log(`Failed to save credentials for ${screen_name}: ${err}`));
};

/**
 * Get credentials
 * @method getByRequestToken
 * @param  {String} access_request_token
 * @return {Promise<Object>} resolves with object containing key and secret
 */
module.exports.getByRequestToken = (access_request_token) => {
  return dbDriver.find(
    credentialsCol,
    { access_request_token }
  );
};

/**
 * Get credentials
 * @method getByAccessToken
 * @param  {String} key - The user access token
 * @return {Promise<Object>} resolves with object containing key and secret
 */
module.exports.getByAccessToken = (key) => {
  return dbDriver.find(
    credentialsCol,
    { key }
  );
};

/**
 * Remove credentials
 * @method removeByRequestToken
 * @param  {String} key - The user access token
 * @return {Promise<void>}
 */
module.exports.removeByRequestToken = (access_request_token) => {
  return dbDriver.remove(
    credentialsCol,
    { access_request_token }
  );
};
