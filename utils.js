module.exports = {};

module.exports.cache = (function () {
  const cache = {};

  function requestId(req) {
    return req.route.path + JSON.stringify(req.query) + JSON.stringify(req.body);
  }

  return {
    set: (req, responseContent) => {
      cache[requestId(req)] = responseContent;
    },
    get: (req) => {
      return cache[requestId(req)];
    },
  };
}());

module.exports.send = (res, json, delay = 0) => {
  setTimeout(() => res.json(json), delay);
};
