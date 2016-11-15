const { send } = require('../utils');
const twitter = require('../twitter-api');
const defaultResponse = require('./home-fallback-response.json');

module.exports = (req, res) => {
  twitter.userHome(res.locals.credentials)
    .then(tweets => send(res, { tweets }, 0))
    // If there is an error we will send a default response
    // while during testing
    .catch(err => {
      console.log(err);
      send(res, defaultResponse);
    })
    .catch(err => {
      res.status(500).send(`{ error: ${err}}`);
    });
};
