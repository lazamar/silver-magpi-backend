/* eslint-disable camelcase */
const dbDriver = require('./driver');

let db;
const dbName = process.env.DB_NAME;
let appAuthCollection;

// NOTE: This initialisation takes some time, but the code does not
// enforce waiting for it. For now it is not expected to create problems,
// but it must be done propperly later.

// Load database
dbDriver.getDatabase(dbName)
  .then(d => (db = d))
  // Load collections
  .then(() => dbDriver.getCollection(db, 'app-authorisation'))
  .then(col => (appAuthCollection = col));

module.exports = {};

/**
 * Save credentials
 * @method save
 * @return {Promise<void>} resolved when the record is successfully saved.
 */
module.exports.save = ({ app_session_id, access_request_token }) => {
  const record = { app_session_id, access_request_token };

  // Remove any previous record with the same key
  return dbDriver.remove(appAuthCollection, { key: record.key })
    // Save key and password in the database
    .then(() => dbDriver.insert(appAuthCollection, record));
};

/**
 * Get credentials
 * @method get
 * @param  {String} app_session_id
 * @return {Promise<Object>} resolves with object containing the access token and the appSessionId
 */
module.exports.get = (app_session_id) => {
  return dbDriver.find(
    appAuthCollection,
    { app_session_id }
  );
};
