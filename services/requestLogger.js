var logger = require('../modules/logger.js');

var requestLogger = (req, res, next) => {
    logger.info(`Got new connection at ${new Date().toString()} > ${req.method} ${req.url}`);
    next();
};

module.exports = requestLogger;