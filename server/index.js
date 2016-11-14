// Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const requireDir = require('require-dir-all');
const routes = requireDir('../routes');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  // Allow CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // Disable cache for all endpoints
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);

  // Log request info
  console.log(`
---------------------------------------
${req.url}
body: ${JSON.stringify(req.body)}
query: ${JSON.stringify(req.query)}
---------------------------------------`);
  next();
});

// Serve static files from root
app.use('/', express.static(path.join(__dirname, '../static')));

// Routes
app.get('/home', routes.home);
app.get('/mentions', routes.mentions);
app.post('/status-update', routes['status-update']);
app.get('/user-search', routes['user-search']);
app.get('/save-credentials', routes['save-credentials']);
app.get('/sign-in', routes['sign-in']);
app.get('/app-get-access', routes['app-get-access']);

module.exports = app;
