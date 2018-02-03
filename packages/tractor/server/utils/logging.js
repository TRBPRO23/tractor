'use strict';

// Dependencies:
var chalk = require('chalk');

module.exports = (function () {
    return {
        info: info,
        warn: warn,
        important: important,
        success: success,
        error: error
    };

    function info (message) {
        console.log(chalk.bold(' INFO: ') + ' ' + chalk.white(message));
    }

    function warn (message) {
        console.log(chalk.bold.black.bgYellow(' WARNING: ') + ' ' + chalk.yellow(message));
    }

    function important (message) {
       console.log(chalk.bold.white.bgBlue(' ' + message + ' '));
    }

    function success (message) {
        console.log(chalk.bold.white.bgGreen(' SUCCESS: ') + ' ' + chalk.green(message));
    }

    function error (message) {
        console.log(chalk.bold.white.bgRed(' ERROR: ') + ' ' + chalk.red(message));
    }
})();
