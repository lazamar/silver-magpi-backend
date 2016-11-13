
const request = require('request');
const qs = require('querystring');
const requestTokenUrl = 'https://api.twitter.com/oauth/request_token';

const oauth = {
  callback: `${process.env.DOMAIN}/save-credentials`,
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
};

console.log('Callback url: ', oauth.callback);

module.exports = (req, res) => {
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
      oauth_token_secret,
      oauth_callback_confirmed,
    } = qs.parse(body);

    console.log('oauth callback confirmed: ', oauth_callback_confirmed);
    console.log('oauth secret: ', oauth_token_secret);

    // Step 2 of 2: Redirect the user to sign-in with Twitter.
    // The next steps will be made at the oauth callback url.
    res.redirect(301, `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`);
  })
  .catch(err => {
    res.status(500).send(`{ error: ${err}}`);
  });
};
