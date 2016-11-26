const { send } = require('../utils');
const twitter = require('../twitter-api');
const bigInt = require('big-integer');

module.exports = (req, res) => {
  const sinceId = req.query.sinceId
    ? bigInt(req.query.sinceId).add(1).toString()
    : undefined;

  const maxId = req.query.maxId
    ? bigInt(req.query.maxId).subtract(1).toString()
    : undefined;

  twitter.userTimeline(res.locals.credentials, 'mentions', sinceId, maxId)
    .then(tweets => send(res, { tweets }))
    .catch(err => {
      res.status(500).send(`{ error: ${err}}`);
    });
};
