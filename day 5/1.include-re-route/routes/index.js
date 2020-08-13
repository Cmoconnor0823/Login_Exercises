const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const User = require('../models/User');
const {
    ensureAuthenticated
} = require('../passport/auth');


router.use('/', authRoutes);

router.get('/landing/:id', ensureAuthenticated, (req, res) => {
    User.findById({ _id : req.params.id}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let email = data.email;
            let id = data._id;
            res.render('layouts/landing', {
                name,
                email,
                id
            });
        }
    });
});

module.exports = router;