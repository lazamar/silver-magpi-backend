const db = require('../database');
const request = require('request');
const qs = require('querystring');
const convertTokenUrl = 'https://api.twitter.com/oauth/access_token';

// This endpoint is the oauth_callback url from
// https://dev.twitter.com/web/sign-in/implementing
module.exports = (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;

  const oauth = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: oauth_token,
    verifier: oauth_verifier,
  };

  new Promise((resolve, reject) => {
    request.post(
      { url: convertTokenUrl, oauth },
      (e, r, body) => (e ? reject(e) : resolve(body))
    );
  })
  .then(body => {
    const authenticatedData = qs.parse(body);
    const {
      oauth_token,
      oauth_token_secret,
      user_id,
      screen_name,
    } = authenticatedData;

    console.log(authenticatedData);

    db.saveCredentials(oauth_token, oauth_token_secret);
    res.send();
  });
};
