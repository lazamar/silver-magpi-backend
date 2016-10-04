const twitter = require('../twitterApi');
module.exports = (req, res) => {
  twitter.userHome()
    .then(tweets => res.json({ tweets }))
    .catch(err => {
      console.log(err);
      res.status(500).send('{ error: ${err}}');
    });
};
