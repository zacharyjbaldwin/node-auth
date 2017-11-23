var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
    var err = new Error('File Not Found');
    err.status = 404;
    next(err);
});

router.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
});

module.exports = router;