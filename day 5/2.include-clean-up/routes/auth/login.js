const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/User');
const {
    ensureAuthenticated
} = require('../../passport/auth');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/auth/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
});

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    userId = req.user.id
    User.findById({
            _id: userId
        })
        .then((data) => {
            let name = data.name;
            let id = data._id;
            res.render('layouts/username', {
                name,
                id
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'You have logged out');
    res.redirect('/');
});

module.exports = router;