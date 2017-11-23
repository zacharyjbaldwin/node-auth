var express = require('express');
var router = express.Router();
var User = require('../models/users.js');

router.get('/', (req, res) => {
    return res.sendFile(`${__dirname}/public/showcase.html`);
});

// LOGIN FRONTEND
router.get('/login', (req, res) => {
    var options = {
        errorMessage: null,
        redirect: '/profile'
    };
    if (req.query.error) {
        var error = req.query.error;
        if (error === '0') {
            options.errorMessage = 'You are not logged in!';
        } else if (error === '1') {
            options.errorMessage = 'Your password is incorrect!';
        } else if (error === '2') {
            options.errorMessage = 'The given email is not associated with an account!';
        } else {
            options.errorMessage = null;
        }
    }
    return res.render('login.hbs', options);
});

// LOGIN BACKEND
router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) { // USER LOGGING IN + ALL FIELDS ARE PROVIDED
        User.authenticate(req.body.email, req.body.password, (err, user) => {
            if (err || !user) {
                res.render('/login?error=1')
            } else {
                req.session.userId = user._id;
                res.redirect('profile');
            }
        });
    }
});

// LOGOUT FRONTEND
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            } else {
                res.redirect('/');
            }
        });
    }
});

// PROFILE FRONTEND
router.get('/profile', (req, res) => {
    User.findById(req.session.userId).exec((err, user) => {
        if (err) {
            next(err);
        } else if (user === null) {
            res.redirect('/login?error=0&redirect=/profile');
        } else if (user !== null) {
            res.render('profile.hbs', {
                userInfo: {
                    email: user.email,
                    username: user.username
                }
            });
        }
    });

    // res.redirect('/login?error=0&redirect=/profile');
});

// REGISTER FRONTED
router.get('/register', (req, res) => {
    res.render('register.hbs');
});

// REGISTER BACKEND
router.post('/register', (req, res) => {
    if (req.body.password !== req.body.confirmPassword) { // USER SIGNING UP + PASSWORDS DO NOT MATCH
        return res.render('/register?error=')
    } else if (req.body.email && req.body.username && req.body.password && req.body.confirmPassword && (req.body.password === req.body.confirmPassword)) { // USER SIGNING UP + ALL FIELDS ARE PROVIDED AND PASSWORDS MATCH

    }
});

module.exports = router;