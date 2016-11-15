/* eslint-disable camelcase */
const db = require('../database');

/**
 * Resolves with user credentials or fails to authenticate
 * @method getCredentials
 * @param  {String} app_session_id
 * @return {Promise<Object>} credentials
 */
function getCredentials(app_session_id) {
  return db.appAuthorisation.get(app_session_id)
    .then(r => r || Promise.reject())
    .then(record => {
      // The authorisation request was found, now let's see if
      // it was completed and a credentials record was created with it.
      const { access_request_token } = record;
      return db.credentials.getByRequestToken(access_request_token);
    })
    .then(cred => cred || Promise.reject())
    .then(credentials => {
      // For now we don't expose the user access token,
      // we return an authorised app_session_id instead.
      return {
        access_token_key: credentials.key,
        access_token_secret: credentials.secret,
        screen_name: credentials.screen_name,
        user_id: credentials.user_id,
      };
    });
}

// Get credentials and add them to res.locals.credentials
// or return an unauthorised error
module.exports = (req, res, next) => {
  const app_session_id = req.get('X-App-Token');

  getCredentials(app_session_id)
    .then(credentials => {
      res.locals.credentials = credentials; // eslint-disable-line no-param-reassign
      next();
    })
    .catch(() => {
      res.status(401).send(JSON.stringify({ error: 'Unauthorised' }));
    });
};
