const twitter = require('../twitter-api');

// Returns user infor if the app is authorised
module.exports = (req, res) => {
  const tweetId = req.query.id;

  // POST favorites, DELETE unfavorites
  const shouldFavorite = req.method === 'POST';

  twitter.favoriteTweet(
    res.locals.credentials,
    shouldFavorite,
    tweetId
  )
  .then(response => {
    res.json({ status: `Tweet ${shouldFavorite ? 'favorited' : 'unfavorited'}` });
  })
  .catch(err => {
    console.error('An error occurred when favoriting:', err);
    res.status(500).send(`{ error: ${err}}`);
  });
};
