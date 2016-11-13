const db = require('../database')

// This endpoint is the oauth_callback url from
// https://dev.twitter.com/web/sign-in/implementing
module.exports = (req, res) => {
  const { oauth_token, oauth_verifier } = req.query;
  console.log(JSON.stringify({ oauth_token, oauth_verifier }));

  // THIS IS WRONG! JUST FOR TESTING
  db.saveCredentials(oauth_token, oauth_verifier)
    .then(res.send(JSON.stringify({ oauth_token, oauth_verifier })))
    .catch(error => res.status(500).send(JSON.stringify({ error })));
};
