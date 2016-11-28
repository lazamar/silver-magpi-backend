const fakeResponse = require('./fake-tweet-posted.json');
const { send } = require('../utils');
const twitter = require('../twitter-api');

module.exports = (req, res) => {
  const { status, in_reply_to_status_id } = req.body;

  twitter.postUpdate(res.locals.credentials, status, in_reply_to_status_id)
    .then(response => send(res, response))
    .catch(error => {
      res.status(500).send(JSON.stringify({ error }));
    });
};
