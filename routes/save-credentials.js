const db = require('../database');
const request = require('request');
const qs = require('querystring');
const convertTokenUrl = 'https://api.twitter.com/oauth/access_token';

// This endpoint is the oauth_callback url from
// https://dev.twitter.com/web/sign-in/implementing
//
// Twitter will call this endpoint with the oauth_verifier value,
// which we will immediately exchange for a user access token and
// access token secret.
// At the end of this function, the user token and secret are saved in the database.
module.exports = (req, res) => {
  // Collect verifier
  const { oauth_token, oauth_verifier } = req.query;

  const oauth = {
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    token: oauth_token,
    verifier: oauth_verifier,
  };

  // Exchange verifier for access token and access token secret
  new Promise((resolve, reject) => {
    request.post(
      { url: convertTokenUrl, oauth },
      (e, r, body) => (e ? reject(e) : resolve(body))
    );
  })
  .then(body => {
    const authenticatedData = qs.parse(body);
    const {
      oauth_token, // this is not the same oauth_token as before. This is the user access token
      oauth_token_secret,
      user_id,
      screen_name,
    } = authenticatedData;

    console.log(authenticatedData);

    db.saveCredentials(oauth_token, oauth_token_secret);
    res.send();
  });
};
