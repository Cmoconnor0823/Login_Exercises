const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get('/register', (req, res) => {
    res.render('layouts/register');
});


router.post('/register', (req, res) => {
    let name = req.body.username;
    let email = req.body.email;
    let userPassword = req.body.password;
    let errors = [];
    if (!name || !email || !userPassword) {
        errors.push({
            message: "Please fill in all fields"
        });
    } 
    if (errors.length > 0) {
        res.render('layouts/register', {
            errors
        });
    } else {
        User.findOne({
                email: email
            })
            .then(async (data) => {
                if (data) {
                    errors.push({
                        message: "This email is already registered"
                    })
                    res.render('layouts/register', {
                        errors
                    });
                } else {
                    const salt = await bcrypt.genSalt(10);
                    let password = await bcrypt.hash(userPassword, salt);
                    let user = new User({
                        name,
                        email,
                        password
                    });
                    user.save();
                    req.flash('success', 'You are registered and can log in');
                    res.redirect('/');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

});

module.exports = router;