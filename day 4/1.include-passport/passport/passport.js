//This code could (and should) be converted to promises
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
//include database (model)
const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            //match user
            User.findOne({
                email: email
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (!data) {
                        return done(null, false, {
                            message: "Your email is not in our records"
                        });
                    } else {
                        let hashedPassword = data.password;
                        //isMatch is a bcrypt method
                        bcrypt.compare(password, hashedPassword, (err, isMatch) => {
                            if (err) {
                                console.log(err);
                            } else {
                                if (isMatch) {
                                    return done(null, data);
                                } else {
                                    return done(null, false, {
                                        message: 'The password does not match'
                                    });
                                }
                            }
                        });
                    }
                }
            });

        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

//the following is from Stack Overflow:

/*
1. Where does user.id go after passport.serializeUser has been called?
The user id (you provide as the second argument of the done function) is saved in the session and is later used to retrieve the whole object via the deserializeUser function.

serializeUser determines which data of the user object should be stored in the session. The result of the serializeUser method is attached to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'}

2. We are calling passport.deserializeUser right after it where does it fit in the workflow?
The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.). So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.

The fetched object is attached to the request object as req.user
*/

