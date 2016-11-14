/* eslint-disable camelcase */
const request = require('request');
const db = require('../database');
const qs = require('querystring');
const requestTokenUrl = 'https://api.twitter.com/oauth/request_token';

const oauth = {
  callback: `${process.env.DOMAIN}/save-credentials`,
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
};

module.exports = (req, res) => {
  const { app_session_id } = req.query;

  // Step 1 of 2: Get a request token
  new Promise((resolve, reject) => {
    request.post(
      { url: requestTokenUrl, oauth },
      (e, r, body) => (e ? reject(e) : resolve(body))
    );
  })
  .then(body => {
    // Parsing the Query String containing the oauth_token and oauth_secret.
    const {
      oauth_token,
      oauth_token_secret, // eslint-disable-line no-unused-vars
      oauth_callback_confirmed, // eslint-disable-line no-unused-vars
    } = qs.parse(body);

    const access_request_token = oauth_token;

    // Save these to later be able to link the authorised request with
    // the app_session_id
    db.appAuthorisation.save({
      app_session_id,
      access_request_token,
    });

    // Step 2 of 2: Redirect the user to sign-in with Twitter.
    // The next steps will be made at the oauth callback url.
    res.redirect(301, `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`);
  })
  .catch(err => {
    res.status(500).send(`{ error: ${err}}`);
  });
};
