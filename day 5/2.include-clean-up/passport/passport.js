const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//include database (model)
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            User.findOne({
                    email: email
                })
                .then((data) => {
                    if (!data) {
                        return done(null, false, {
                            message: "Your email is not in our records"
                        });
                    } else {
                        let hashedPassword = data.password;
                        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (isMatch) {
                                    return done(null, data);
                                } else {
                                    return done(null, false, {
                                        message: "The password does not match"
                                    });
                                }
                            }
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};