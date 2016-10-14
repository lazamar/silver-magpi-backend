const DELAY = 0;

const twitter = require('../twitterApi');
module.exports = (req, res) => {
  const send = json => setTimeout(() => {
    console.log(json);
    res.json(json);
  }, DELAY);

  const status = req.body.status;
  console.log('Request body:', JSON.stringify(req.body));

  twitter.postUpdate(status)
    .then(response => send(response))
    .catch(error => {
      res.status(500).send(JSON.stringify({ error }));
    });
};
