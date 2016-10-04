const credentials = require('./credentials.json');
const Twitter = require('twitter');

function handleResponse(resolve, reject) {
  return (err, tweets) => {
    return err ? reject(err) : resolve(tweets);
  };
}

function twitterGet(client, url, queryParams) {
  return new Promise((resolve, reject) => {
    const responseHandler = handleResponse(resolve, reject);
    const params = queryParams
      ? [url, queryParams, responseHandler]
      : [url, responseHandler];

    client.get.apply(client, params);
  });
}


module.exports = (function () {
  const client = new Twitter(credentials);

  const API = {};
  API.userHome = () => twitterGet(client, 'statuses/home_timeline');

  return API;
}());
