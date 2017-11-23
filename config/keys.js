if (process.env.NODE_ENV === 'production') {
    module.exports.keys = require('./productionKeys.js').keys;
} else {
    module.exports.keys = require('./devKeys.js').keys; // This file is not committed to source control.
}