const { send } = require('../utils');
const twitter = require('../twitter-api');
const defaultResponse = require('./home-fallback-response.json');
const bigInt = require('big-integer');

module.exports = (req, res) => {
  const sinceId = req.query.sinceId
    ? bigInt(req.query.sinceId).add(1).toString()
    : undefined;

  const maxId = req.query.maxId
    ? bigInt(req.query.maxId).subtract(1).toString()
    : undefined;

  twitter.userHome(res.locals.credentials, sinceId, maxId)
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
