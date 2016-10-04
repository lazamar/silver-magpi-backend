/* eslint-env node */

// Some initial setup
global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

require('./server');
