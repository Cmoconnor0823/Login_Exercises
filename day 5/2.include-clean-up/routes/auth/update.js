const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const {
    ensureAuthenticated
} = require('../../passport/auth');

router.get('/update/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    User.findById({
        _id: id
    })
    .then((data) => {
        let id = data._id;
        res.render('layouts/update-profile', {
            id
        });
    })
    .catch((err) => {
        console.log(err);
    });
});

router.post('/update/:id', ensureAuthenticated, async (req, res) => {
    let id = req.params.id;
    let newName = req.body.newname;
    let newEmail = req.body.email;
    let currentUser = await User.findById({
        _id: id
    });
    if (!newName && !newEmail || newName === currentUser.name && newEmail === currentUser.email || !newName && email === currentUser.email || newName === currentUser.name && !newEmail){
        User.findById({ _id : id})
        .then((data) => {
            let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/landing', {
                    id,
                    name,
                    email
                });
            }
        )
        .catch((err) => {
            console.log(err);
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
        })
        .then((data) => {
            let id = data._id;
            let name = data.name;
            let email = data.email;
            res.render('layouts/new-profile', {
                id,
                name,
                email
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }
    if (newName && newName !== currentUser.name && !newEmail) {
        User.findByIdAndUpdate({
            _id: id
        }, {
            $set: {
                name: newName
            }
        }, {
            new: true
        })
        .then((data) => {
            let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/new-profile', {
                    id,
                    name,
                    email
                });
        })
        .catch((err) => {
            console.log(err);
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
        })
        .then((data) => {
            let id = data._id;
                let name = data.name;
                let email = data.email;
                res.render('layouts/new-profile', {
                    id,
                    name,
                    email
                });
        })
        .catch((err) => {
            console.log(err);
        });
    }
});

router.get('/removeUser/:id', ensureAuthenticated, (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove({
        _id: id
    })
    .then((data) => {
        req.flash('success', 'Profile deleted');
        res.redirect('/');
    })
    .catch((err) => {
        console.log(err);
    });
});

module.exports = router;