const twitter = require('../twitterApi');
const fakeResponse = require('./tweetResponse.json');
const { send } = require('../utils');


module.exports = (req, res) => {
  const status = req.body.status;
  // send(res, fakeResponse, 2000);
  // const error = 'asdf';
  // res.status(500).send(JSON.stringify({ error }));

  twitter.postUpdate(status)
    .then(response => send(res, response))
    .catch(error => {
      res.status(500).send(JSON.stringify({ error }));
    });
};
