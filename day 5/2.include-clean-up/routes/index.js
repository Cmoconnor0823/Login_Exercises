const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const User = require('../models/User');
const {
    ensureAuthenticated
} = require('../passport/auth');

router.use('/', authRoutes);

router.get('/landing/:id', ensureAuthenticated, (req, res) => {
    User.findById({ _id : req.params.id})
    .then((data) => {
        let name = data.name;
            let email = data.email;
            let id = data._id;
            res.render('layouts/landing', {
                name,
                email,
                id
            });
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;