const { send } = require('../utils');
const twitter = require('../twitter-api');

module.exports = (req, res) => {
  twitter.userMentions()
    .then(tweets => send(res, { tweets }))
    .catch(err => {
      res.status(500).send(`{ error: ${err}}`);
    });
};
