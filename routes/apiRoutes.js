var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.query.get) {
        switch (req.query.get.toLowerCase()) {
            case 'currentuser':
                res.send({
                    command: {
                        name: 'currentUser',
                        response: req.session.user || 'none'
                    },
                });
                break;
        }
    } else {
        res.send({
            error: {
                message: 'Specify a command.',
                status: 400
            }
        });
    }
});

module.exports = router;