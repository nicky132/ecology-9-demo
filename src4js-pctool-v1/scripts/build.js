'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');

const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const webpack = require('webpack');
const config = require('../config/webpack.config.prod');
const paths = require('../config/paths');
const checkRequiredFiles = require('react-dev-utils/checkRequiredFiles');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const printHostingInstructions = require('react-dev-utils/printHostingInstructions');
const FileSizeReporter = require('react-dev-utils/FileSizeReporter');
const printBuildError = require('react-dev-utils/printBuildError');

const measureFileSizesBeforeBuild =
  FileSizeReporter.measureFileSizesBeforeBuild;
const printFileSizesAfterBuild = FileSizeReporter.printFileSizesAfterBuild;
const useYarn = fs.existsSync(paths.yarnLockFile);

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

const versions = require('../versions');

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1);
}

// First, read the current file sizes in build directory.
// This lets us display how much they changed later.
measureFileSizesBeforeBuild(paths.appBuild)
  .then(previousFileSizes => {
    // Remove all content but keep the directory so that
    // if you're in it, you don't end up in Trash
    if (!paths.noEmptyDir && paths.htmlName && paths.appHtml) {
      fs.emptyDirSync(paths.appBuild);
    }
    // Merge with the public folder
    // copyPublicFolder();
    // Start the webpack build
    return build(previousFileSizes);
  })
  .then(
    ({ stats, previousFileSizes, warnings }) => {
      if (warnings.length) {
        console.log(chalk.yellow('Compiled with warnings.\n'));
        console.log(warnings.join('\n\n'));
        console.log(
          '\nSearch for the ' +
            chalk.underline(chalk.yellow('keywords')) +
            ' to learn more about each warning.'
        );
        console.log(
          'To ignore, add ' +
            chalk.cyan('// eslint-disable-next-line') +
            ' to the line before.\n'
        );
      } else {
        console.log(chalk.green('Compiled successfully.\n'));
      }

      if (Array.isArray(paths.copyFilesPath)) {
        // const reg = /[^\/]+\/[^\/]+$/;
        paths.copyFilesPath.forEach(copyFile => {
          fs.copy(copyFile.from, copyFile.to, err => {
            if (err) {
              console.log(chalk.red('Failed to copy files.\n'));
              printBuildError(err);
            } else {
              console.log('The ' + chalk.green(copyFile.from) + ' has copied to ' + chalk.green(copyFile.to) + '\n');
            }
          })
        });
      }

      if (Array.isArray(versions)) {
        const version = new Date().getTime();
        const js = {};
        const css = {};
        const copyJs = {};
        const copyCss = {};
        if (paths.servedPath) {
          if (paths.jsName) {
            js.key = paths.servedPath + paths.jsName;
            js.src = js.key + '?v=' + version;
            js.version = version;
          }
          if (paths.cssName) {
            css.key = paths.servedPath + paths.cssName;
            css.src = css.key + '?v=' + version;
            css.version = version;
          }
          if (Array.isArray(paths.copyFiles)) {
            const reg = new RegExp(`^${paths.buildPath}`);
            paths.copyFiles.forEach(c => {
              if (reg.test(c.from) && /^\.\.\/.*/.test(c.to)) {
                const ck = c.to.replace(/^\.\./, '');
                if (js.key && new RegExp(`${js.key}$`).test(c.from)) {
                  copyJs.key = ck;
                  copyJs.src = ck + '?v=' + version;
                  copyJs.version = version;
                }
                if (css.key && new RegExp(`${css.key}$`).test(c.from)) {
                  copyCss.key = ck;
                  copyCss.src = ck + '?v=' + version;
                  copyCss.version = version;
                }
              }
            });
          }
          if (paths.moduleConfig) {
            fs.readFile(paths.moduleConfig, { encoding:'utf8' },(err, data) => {
              if(err)
                return console.error(err);
              let oldData = data.toString();
              if (oldData) {
                if (css.key) {
                  oldData = oldData.replace(new RegExp(`\\'${css.key}[^\\']*\\'`, 'g'), `'${css.src}'`);
                }
                if (js.key) {
                  oldData = oldData.replace(new RegExp(`\\'${js.key}[^\\']*\\'`, 'g'), `'${js.src}'`);
                }
                if (copyJs.key) {
                  oldData = oldData.replace(new RegExp(`\\'${copyJs.key}[^\\']*\\'`, 'g'), `'${copyJs.src}'`);
                }
                if (copyCss.key) {
                  oldData = oldData.replace(new RegExp(`\\'${copyCss.key}[^\\']*\\'`, 'g'), `'${copyCss.src}'`);
                }
              }
              fs.writeFile(paths.moduleConfig, oldData, { 'flag': 'w' }, function(err) {
                if(err) console.log(err);
              })
            });
          }
          const newVersions = versions.filter(v => v.key !== js.key).filter(v => v.key !== css.key);
          if (css.key) {
            newVersions.push(css);
          }
          if (js.key) {
            newVersions.push(js);
          }
          if (copyJs.key) {
            newVersions.push(copyJs);
          }
          if (copyCss.key) {
            newVersions.push(copyCss);
          }
          let content = 'module.exports = ';
          content += JSON.stringify(newVersions);
          fs.writeFile('versions.js', content, { 'flag': 'w' }, function(err) {
            if(err) console.log(err);
          })
        }
      }

      console.log('File sizes after gzip:\n');
      printFileSizesAfterBuild(
        stats,
        previousFileSizes,
        paths.appBuild,
        WARN_AFTER_BUNDLE_GZIP_SIZE,
        WARN_AFTER_CHUNK_GZIP_SIZE
      );
      console.log();

      const appPackage = require(paths.appPackageJson);
      const publicUrl = paths.publicUrl;
      const publicPath = config.output.publicPath;
      const buildFolder = path.relative(process.cwd(), paths.appBuild);
      printHostingInstructions(
        appPackage,
        publicUrl,
        publicPath,
        buildFolder,
        useYarn
      );
    },
    err => {
      console.log(chalk.red('Failed to compile.\n'));
      printBuildError(err);
      process.exit(1);
    }
  );

// Create the production build and print the deployment instructions.
function build(previousFileSizes) {
  console.log('Creating an optimized production build...');

  let compiler = webpack(config);
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        return reject(err);
      }
      const messages = formatWebpackMessages(stats.toJson({}, true));
      if (messages.errors.length) {
        // Only keep the first error. Others are often indicative
        // of the same problem, but confuse the reader with noise.
        if (messages.errors.length > 1) {
          messages.errors.length = 1;
        }
        return reject(new Error(messages.errors.join('\n\n')));
      }
      if (
        process.env.CI &&
        (typeof process.env.CI !== 'string' ||
          process.env.CI.toLowerCase() !== 'false') &&
        messages.warnings.length
      ) {
        console.log(
          chalk.yellow(
            '\nTreating warnings as errors because process.env.CI = true.\n' +
              'Most CI servers set it automatically.\n'
          )
        );
        return reject(new Error(messages.warnings.join('\n\n')));
      }
      return resolve({
        stats,
        previousFileSizes,
        warnings: messages.warnings,
      });
    });
  });
}

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file === paths.appHtml || paths.appHtml.indexOf(file) === 0,
  });
}
