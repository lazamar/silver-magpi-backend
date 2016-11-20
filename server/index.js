// Libraries
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const requireDir = require('require-dir-all');
const routes = requireDir('../routes');
const authenticate = require('./authenticate');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors()); // Allow CORS

app.use((req, res, next) => {
  // Allow app access token in header
  res.append('Access-Control-Allow-Headers', ['X-App-Token']);

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
app.use('/', express.static(path.join(__dirname, '../static/src')));

// Routes
app.get('/home', authenticate, routes.home);
app.get('/mentions', authenticate, routes.mentions);
app.post('/status-update', authenticate, routes['status-update']);
app.get('/user-search', authenticate, routes['user-search']);
app.get('/save-credentials', routes['save-credentials']);
app.get('/sign-in', routes['sign-in']);
app.get('/app-get-access', authenticate, routes['app-get-access']);
app.delete('/app-revoke-access', authenticate, routes['app-revoke-access']);

module.exports = app;
