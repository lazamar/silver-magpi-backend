const credentials = require('./credentials.json');
const Twitter = require('twitter');

function handleResponse(resolve, reject) {
  return (err, response) => {
    return err ? reject(err) : resolve(response);
  };
}

function twitterCall(method, client, url, reqParams) {
  return new Promise((resolve, reject) => {
    const responseHandler = handleResponse(resolve, reject);
    const params = reqParams
      ? [url, reqParams, responseHandler]
      : [url, responseHandler];

    client[method].apply(client, params);
  });
}


module.exports = (function () {
  const client = new Twitter(credentials);

  const API = {};
  API.userHome = () => twitterCall('get', client, 'statuses/home_timeline');
  API.postUpdate = status => twitterCall('post', client, 'statuses/update', { status });
  API.userMentions = () => twitterCall('get', client, 'statuses/mentions_timeline');
  return API;
}());
