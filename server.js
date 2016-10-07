// Libraries
const express = require('express');
const app = express();
const http = require('http').Server(app); // eslint-disable-line new-cap

const requireDir = require('require-dir-all');
const routes = requireDir('./routes');

const PORT = 8080;

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  console.log(req.url)
  next();
});

// Serve static files from root
app.use(express.static('static'));

// Routes
app.get('/home', routes.home);


http.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
