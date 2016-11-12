const app = require('./index');

const http = require('http').Server(app); // eslint-disable-line new-cap
const PORT = 8080;
http.listen(PORT, () => {
  console.log(`
    Silve-Magpie development server listening on port ${PORT}
  `);
});
