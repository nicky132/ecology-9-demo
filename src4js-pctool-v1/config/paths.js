'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const weaverConfig = require('../webpack-config');

let entry = weaverConfig.entry;
if(entry.indexOf("index.js")>=0) entry = entry.substring(0,entry.length-8);

let copyFiles = [];
let copyFilesPath = [];
if (Array.isArray(weaverConfig.copyFiles) && weaverConfig.copyFiles.length > 0) {
  copyFiles = weaverConfig.copyFiles;
  copyFilesPath = weaverConfig.copyFiles.map(copyFile => ({
    from: resolveApp(copyFile.from),
    to: resolveApp(copyFile.to),
  }));
}
// config after eject: we're in ./config/
module.exports = {
  dotenv: resolveApp('.env'),
  appBuild: resolveApp(weaverConfig.buildPath),//resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/'+weaverConfig.htmlTemplate),//resolveApp('public/index.html'),
  appIndexJs: resolveApp(weaverConfig.entry),//resolveApp('src/index.js'),
  appSingleJs: weaverConfig.entry4single?resolveApp(weaverConfig.entry4single):'',//resolveApp('src/index.js'),
  appIndexJs4debug: weaverConfig.entry4debug?resolveApp(weaverConfig.entry4debug):'',
  appPackageJson: resolveApp('package.json'),
  appSrc: resolveApp(weaverConfig.appSrc || '../src4js'), //resolveApp('src'),
  yarnLockFile: resolveApp('yarn.lock'),
  testsSetup: resolveApp('src/setupTests.js'),
  appNodeModules: resolveApp('node_modules'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: weaverConfig.servedPath ? weaverConfig.servedPath : getServedPath(resolveApp('package.json')),
  cssName: weaverConfig.cssName?weaverConfig.cssName:'',
  jsName: weaverConfig.jsName?weaverConfig.jsName:'',
  htmlName: weaverConfig.htmlName?weaverConfig.htmlName:'',
  jsSingleName: weaverConfig.jsSingleName?weaverConfig.jsSingleName:'',
  library: weaverConfig.library?weaverConfig.library:null,
  libraryTarget: weaverConfig.libraryTarget?weaverConfig.libraryTarget:null,
  analyzer: weaverConfig.analyzer || null,
  appTsConfig: resolveApp('ts/tsconfig.json'),
  appTsProdConfig: resolveApp('ts/tsconfig.prod.json'),
  appTsTestConfig: resolveApp('ts/tsconfig.test.json'),
  appTsLint: resolveApp('ts/tslint.json'),
  buildPath: weaverConfig.buildPath,
  copyFiles,
  copyFilesPath,
  moduleConfig: resolveApp('../spa/moduleConfig.js'),
  noEmptyDir: weaverConfig.noEmptyDir,
  setStaticVersion: weaverConfig.setStaticVersion,
};
