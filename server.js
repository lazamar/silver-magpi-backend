// Libraries
const express = require('express');
const app = express();
const http = require('http').Server(app); // eslint-disable-line new-cap
const bodyParser = require('body-parser');

const requireDir = require('require-dir-all');
const routes = requireDir('./routes');

const PORT = 8080;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  console.log(`
---------------------------------------
${req.url}
Request body: ${JSON.stringify(req.body)}
---------------------------------------`);
  next();
});

// Serve static files from root
app.use(express.static('static'));

// Routes
app.get('/home', routes.home);
app.get('/mentions', routes.mentions);
app.post('/status-update', routes['status-update']);

http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
