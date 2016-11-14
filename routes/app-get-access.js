// This request is made by the client app.
// It is asking for a user token, which is needed to make requests
// for a specific user.
// The application will pass a session id, which is kept in the user's
// localStorage. This session id will be recorded when the user authentication
// goes through.

const db = require('../database');

module.exports = (req, res) => {
  const { app_session_id } = req.query;

  db.appAuthorisation.get(app_session_id)
    .then(record => {
      console.log(`
        Record: ${record}
      `);
      if (!record) {
        return Promise.reject();
      }

      // The authorisation request was found, now let's see if
      // it was completed and a credentials record was created with it.
      const { access_request_token } = record;
      return db.credentials.getByRequestToken(access_request_token);
    })
    .then(credentials => {
      console.log(`
        Credentials: ${credentials}
      `);
      if (!credentials) {
        return Promise.reject();
      }

      return res.json({
        app_session_id,
        access_key: credentials.key,
        status: 'Authorised',
      });
    })
    .catch(err => {
      return err
        ? res.status(500).send(`{ error: ${err}}`)
        : res.json({
          app_session_id,
          token: null,
          status: 'User not authenticated',
        });
    });
};
