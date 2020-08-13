//login.js file should be split into login and index
//routes should be converted to promises
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const { ensureAuthenticated } = require('../passport/auth');

router.get('/', (req, res) => {
    //renders file 'login' in folder 'layouts'
    //moved login so that it renders when arrive at site
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
//login now handled by passport.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
 });

router.get('/dashboard', ensureAuthenticated, async (req, res) => {
    userId = req.user.id
    await User.findById({ _id : userId}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let name = data.name;
            let id = data._id;
            res.render('layouts/username', {
                name: name,
                id : id
            });
        }
    });
    
});

//allows user to 'land' on profile page
//renders form to update user name and enmail
router.get('/update/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    User.findById({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('layouts/update-profile', {
                id: id
            });
        }
    });
});

//Allows user to update name or email
router.post('/update/:id', ensureAuthenticated, async (req, res) => {
    let id = req.params.id;
    let newName = req.body.newname;
    console.log('new name ', newName )
    let newEmail = req.body.email;
    let currentUser = await User.findById({
        _id: id
    });
    //if nobody enters anything in field
    if (!newName && !newEmail || newName === currentUser.name && newEmail === currentUser.email || !newName && email === currentUser.email || newName === currentUser.name && !newEmail){
        User.findById({ _id : id}, (err, data) => {
            if (err){
                console.log(err);
            }else{
                let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/landing', {
                    id,
                    name,
                    email
                });
            }
        });
    }
    if (newName && newName !== currentUser.name && newEmail && newEmail !== currentUser) {
        User.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                name: newName,
                email: newEmail
            }
        }, {
            new: true
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/landing', {
                    id,
                    name,
                    email
                });
            }

        });
    };
    if (newName && newName !== currentUser.name && !newEmail) {
        User.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                name: newName
            }
        }, {
            new: true
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/landing', {
                    id,
                    name,
                    email
                });
            }
        });
    }
    if (newEmail && newEmail !== currentUser.email && !newName) {
        User.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                email: newEmail
            }
        }, {
            new: true
        }, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/landing', {
                    id,
                    name,
                    email
                });
            }
        });
    }
});

//removes user
router.get('/removeUser/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
            req.flash('success', 'Profile deleted');
            res.redirect('/');
        }
    })
});

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
});

module.exports = router;