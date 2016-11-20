const twitter = require('../twitter-api');

// Returns user infor if the app is authorised
module.exports = (req, res) => {
  const tweetId = req.query.id;

  // POST retweets, DELETE unretweets
  const shouldRetweet = req.method === 'POST';

  twitter.retweet(
    res.locals.credentials,
    shouldRetweet,
    tweetId
  )
  .then(_ => {
    res.json({ status: 'Tweet retweted successfully' });
  })
  .catch(err => {
    console.error('An error occurred when retweeting:', err);
    res.status(500).send(`{ error: ${err}}`);
  });
};
