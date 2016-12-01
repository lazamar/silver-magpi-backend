const { send } = require('../utils');
const twitter = require('../twitter-api');

module.exports = (req, res) => {
  const ids = req.query.ids
    ? req.query.ids.split(',')
    : [];

  console.log(ids);
  if (ids.length === 0) {
    send(res, { tweets: [] }, 0);
    return;
  }

  twitter.tweetsById(res.locals.credentials, ids)
    .then(tweets => send(res, { tweets }, 0))
    .catch(err => {
      res.status(500).send(`{ error: ${JSON.stringify(err)}}`);
    });
};
