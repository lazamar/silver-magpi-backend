module.exports = {
  send(res, json, delay = 0) {
    setTimeout(() => res.json(json), delay);
  },
};
