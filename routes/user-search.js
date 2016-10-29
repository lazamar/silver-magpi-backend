const twitter = require('../twitterApi');
const { send, cache } = require('../utils');


module.exports = (req, res) => {
  const status = req.query.q;
  // send(res, fakeResponse, 2000);
  // const error = 'asdf';
  // res.status(500).send(JSON.stringify({ error }));

  if (cache.get(req)) {
    send(res, cache.get(req));
    return;
  }

  twitter.userSearch(status)
    .then(response => {
      cache.set(req, response);
      send(res, response);
    })
    .catch(error => {
      res.status(500).send(JSON.stringify({ error }));
    });
};
