/* eslint-disable max-len */
const serverCredentials = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  // "access_token_key": process.env.ACCESS_TOKEN_KEY,
  // "access_token_secret": process.env.ACCESS_TOKEN_SECRET,
};

const Twitter = require('twitter');

function handleResponse(resolve, reject) {
  return (err, response) => {
    return err ? reject(err) : resolve(response);
  };
}

function twitterCall(
  method,
  url,
  reqParams,
  { access_token_key, access_token_secret },
  { consumer_key, consumer_secret }
) {
  const credentials = {
    consumer_key,
    consumer_secret,
    access_token_key,
    access_token_secret,
  };

  const client = new Twitter(credentials);


  return new Promise((resolve, reject) => {
    const responseHandler = handleResponse(resolve, reject);
    const params = reqParams
      ? [url, reqParams, responseHandler]
      : [url, responseHandler];

    client[method].apply(client, params);
  });
}


module.exports = (function () {
  const API = {};
  API.userTimeline = (userCredentials, timelineName, sinceId = '', maxId = '') => {
    const timeline = timelineName === 'home'
      ? 'home_timeline'
      : 'mentions_timeline';

    const query = []
      .concat('count=40')
      .concat(maxId.length > 1 ? `max_id=${maxId}` : [])
      .concat(sinceId.length > 1 ? `since_id=${sinceId}` : [])
      .join('&');

    return twitterCall(
      'get',
      `statuses/${timeline}.json?${query}`,
      {},
      userCredentials,
      serverCredentials
    );
  };

  API.postUpdate = (userCredentials, status) =>
    twitterCall('post', 'statuses/update', { status }, userCredentials, serverCredentials);

  API.userSearch = (userCredentials, query) =>
    twitterCall(
      'get',
      'users/search',
      { q: query, count: 5, include_entities: false },
      userCredentials,
      serverCredentials
    );

  API.favoriteTweet = (userCredentials, shouldFavorite, tweetId) =>
    twitterCall(
      'post',
      `favorites/${shouldFavorite ? 'create' : 'destroy'}.json`,
      { id: tweetId },
      userCredentials,
      serverCredentials
    );

  API.retweet = (userCredentials, shouldRetweet, tweetId) =>
    twitterCall(
      'post',
      `statuses/${shouldRetweet ? 'retweet' : 'unretweet'}/${tweetId}.json`,
      { id: tweetId },
      userCredentials,
      serverCredentials
    );

  return API;
}());
