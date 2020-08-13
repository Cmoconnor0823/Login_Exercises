const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.get('/', (req, res) => {
    //renders file 'login' in folder 'layouts'
    //moved login so that it renders when arrive at site
    //when redirected to '/' will get flash message
    res.render('layouts/login');
});

//allows the user to 'land' on the register page
//otherwise cannot get/register
router.get('/register', (req, res) => {
    res.render('layouts/register');
});

router.post('/register', async (req, res) => {
    let name = req.body.username;
    let email = req.body.email;
    let userPassword = req.body.password;
    //Here there needs to be an if statement for if email is already taken.
    try {
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(userPassword, salt);
        let user = new User({
            name: name,
            email: email,
            password: password
        });
        user.save();
        //render user name
        res.render('layouts/login');
    } catch (err) {
        console.log(err);
    }

});

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        email: email
    }, async (err, data) => {

        if (err) {
            console.log(err);
        } else {
            //if data was available then email matches an email in database
            if (data) {
                let name = data.name;
                let hashedPassword = data.password;
                let _id = data._id;
                const matched = await bcrypt.compare(password, hashedPassword);

                // the hash can then retrieve the information
                // it returns true or false 
                if (matched) {
                    res.render('layouts/username', {
                        name: name,
                        _id: _id
                    });

                } else {
                    //passes message to ejs when hits get('/login')
                    //first parameter is key, second is value
                    //correspond to global variables declared in server
                    req.flash('error', 'password does not match our records');
                    res.redirect('/');
                }
            } else {
                //no data available, so user does not exist
                req.flash('error', 'We do not have that email in our records');
                res.redirect('/');
            }
        }
    });
});


module.exports = router;