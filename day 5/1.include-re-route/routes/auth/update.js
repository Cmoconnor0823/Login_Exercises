const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const {
    ensureAuthenticated
} = require('../../passport/auth');

//allows user to 'land' on profile page
//renders form to update user name and email
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
    let newEmail = req.body.email;
    let currentUser = await User.findById({
        _id: id
    });
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
                res.render('layouts/new-profile', {
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
                res.render('layouts/new-profile', {
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
                res.render('layouts/new-profile', {
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

module.exports = router;