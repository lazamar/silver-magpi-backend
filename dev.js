const app = require('./server');

const http = require('http').Server(app); // eslint-disable-line new-cap
const PORT = 8080;
http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
