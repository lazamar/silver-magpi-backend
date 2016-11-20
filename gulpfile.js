const path = require('path');

// List all available tasks
const src = 'static/src';
const dest = 'static/dist';

const organiser = require('gulp-organiser');
organiser.registerAll('./gulp-tasks', {
  'browser-sync': {
    src: '.', // it doesn't matter, it's just so the task object is not ignored.
    reloadOn: ['sass', 'copy-static'], // reload page when these tasks happen
    startPath: 'index.html',
    baseDir: './static/dist',
  },
  sass: {
    src: path.join(src, 'styles/main.scss'),
    dest: path.join(dest, 'styles'),
  },
  'copy-static': {
    src: path.join(src, '/**/*'),
    dest,
    map: {},
  },

});
