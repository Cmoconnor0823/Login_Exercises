const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');

router.get('/', (req, res) => {
    //renders file 'layout' in folder 'layouts'
    res.render('layouts/register');
});

router.post('/register', async (req, res) => {
    let name = req.body.username;
    let email = req.body.email;
    let userPassword = req.body.password;
    //async function createUser(name, userPassword) {
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
        try {
            if (err) {
                console.log(err);
            } else {
                let name = data.name;
                let hashedPassword = data.password;
                const matched = await bcrypt.compare(password, hashedPassword);

                // the hash can then retrieve the information
                // it returns true or false 
                if (matched) {
                    res.render('layouts/username', {
                        name: name
                    });
                } else {
                    res.redirect('/register');
                }
            }
        } catch (err) {
            console.log(err);
        }
    });
});

module.exports = router;