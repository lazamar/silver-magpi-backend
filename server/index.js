// Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const requireDir = require('require-dir-all');
const routes = requireDir('../routes');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  console.log(`
---------------------------------------
${req.url}
body: ${JSON.stringify(req.body)}
query: ${JSON.stringify(req.query)}
---------------------------------------`);
  next();
});

// Serve static files from root
app.use(express.static('static'));

// Routes
app.get('/home', routes.home);
app.get('/mentions', routes.mentions);
app.post('/status-update', routes['status-update']);
app.get('/user-search', routes['user-search']);
app.get('/save-credentials', routes['save-credentials']);

module.exports = app;
