const { series, src, dest, parallel } = require('gulp');
const rimraf = require('rimraf');
const jsonEditor = require('gulp-json-editor');
const rename = require('gulp-rename');
const argv = require('yargs').argv;

const scripts = {
  start: 'pm2 start ecosystem.config.js',
  stop: 'pm2 stop all',
  delete: 'pm2 delete all',
  reload: 'pm2 reload ecosystem.config.js',
};
const paths = {
  dist: 'dist',
  root: 'app',
  protractor: [],
};
const server = argv.server || 'dev';
function cleanDist(cb) {
  return rimraf(paths.dist, cb);
}
function copyFiles() {
  const files = ['pm2-startup.sh', 'pm2-script.sh'];
  switch (server) {
    case 'stage':
      break;
    default:
      break;
  }
  return src(files).pipe(dest(paths.dist));
}
function copyEcosystemFiles() {
  const files = [];
  switch (server) {
    case 'stage':
      files.push('ecosystem.config.stage.js');
      break;
    default:
      files.push('ecosystem.config.js');
      break;
  }
  return src(files).pipe(rename('ecosystem.config.js')).pipe(dest(paths.dist));
}

function copyFiles() {
  return src(['pm2-startup.sh', 'pm2-script.sh']).pipe(dest(paths.dist));
}
function copyPackage() {
  return src('package.json')
    .pipe(
      jsonEditor((json) => {
        json.scripts = scripts;
        delete json.devDependencies;
        return json;
      })
    )
    .pipe(dest(paths.dist));
}
function copyViews() {
  return src(`./${paths.root}/views/**/*`).pipe(
    dest(`${paths.dist}/${paths.root}/views`)
  );
}
function copyPublic() {
  return src(`./${paths.root}/public/**/*`).pipe(
    dest(`${paths.dist}/${paths.root}/public`)
  );
}
exports.default = series(
  cleanDist,
  parallel(copyFiles, copyEcosystemFiles),
  parallel(copyPackage, copyPublic, copyViews)
);
