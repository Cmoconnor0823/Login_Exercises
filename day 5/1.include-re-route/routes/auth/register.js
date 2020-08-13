const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');

router.get('/register', (req, res) => {
    res.render('layouts/register');
});

router.post('/register', async (req, res) => {
    let name = req.body.username;
    let email = req.body.email;
    let userPassword = req.body.password;
    let errors = [];
    //Here there needs to be an if statement for if email is already taken.
    if (!name || !email || !userPassword) {
        errors.push({
            message: "Please fill in all fields"
        });
    }
    if (errors.length > 0) {
        //fails if error
        //This will render a partial ejs
        res.render('layouts/register', {
            errors
        });
    } else {
        //if no error passes
        //now looks to see if user already in database
        await User.findOne({
            email: email
        }, async (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                //user already in database
                //This will render a partial ejs
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
                    name: name,
                    email: email,
                    password: password
                });
                user.save();
                //render user name
                //flash success message
                req.flash('success', 'You are registered and can log in');
                res.redirect('/');
            }
        });
    }

});

module.exports = router;