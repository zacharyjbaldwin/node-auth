var chalk = require('chalk');

var show = {
    error: true,
    info: true,
    success: true,
    warn: true
}

var error = message => {
    if (show.error) log(chalk.red.bold('ERROR'), message);
}

var info = message => {
    if (show.info) log(chalk.blue.bold('INFO'), message);
}

var log = (type, message) => {
    console.log(`${type} > ${message}`);
};

var success = message => {
    if (show.success) log(chalk.green.bold('SUCCESS'), message);
};

var warn = message => {
    if (show.warn) log(chalk.yellow.bold('WARN'), message);
}

module.exports = {
    show: show,
    error: error,
    info: info,
    log: log,
    success: success,
    warn: warn
};