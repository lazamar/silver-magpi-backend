/* eslint-disable camelcase */
const db = require('../database');

// Returns user infor if the app is authorised
module.exports = (req, res) => {
  const app_session_id = req.get('X-App-Token');

  db.appAuthorisation.get(app_session_id)
    .then(r => r || Promise.reject())
    .then(record => {
      const { access_request_token } = record;

      // Erase authorisation records
      db.appAuthorisation.remove(app_session_id);
      db.credentials.removeByRequestToken(access_request_token);
    })
    .catch(() => undefined);


  // For now the client will be logged out whether the Authorisation
  // records were successfully erased or not. So, we don't really care
  // if erasing fails, we always return a success response.
  res.json({
    status: 'Authorisation revoked.',
  });
};
