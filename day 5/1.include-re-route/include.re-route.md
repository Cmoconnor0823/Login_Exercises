# Include Re-routing

This section of the exercise is mainly dedicated to the restructuring of the routes. In a larger program (because one rarely wants a login just for the sake of itself) this could be to keep the login routes separate from other routes in the application. A restructuring also keeps the routes from crowding together, and can make it easier to troubleshoot if there are problems with the application.

## in Server

* In the server.js file in the root of your project, you will need to change variable name from loginRoutes to routes. Require them at './routes/index' ex: const routes = require('./routes/index');
* Next we will need to update our route connection app.use(loginRoutes); to app.use(routes);

## in Routes

* Now inside of the routes folder, make a new folder called 'auth' and move the 'login.js' file into it.
* Next inside the 'auth' folder, make 3 new files called index.js, register.js and update.js
* Back inside the routes folder we will need to make a file called index.js
* When you do the above steps you will see an error. When the server is looking through a file it goes to the 'index' file first, otherwise 'cannot find ...' error.
* To resolve this open 'routes/index.js' and add inthe following code:

````
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

````

* The get '/' route gets all auth routes
* The get '/landing/:id' route returns the routing to the routes file along with the authenticated user

## in routes/auth

* Now that we have updated the index,js in routes, open up auth/index.js and include the code below:

````
const router = require('express').Router();
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const updateRoutes = require('./update');

router.use('/auth', loginRoutes);
router.use('/new', registerRoutes);
router.use('/user', updateRoutes);

router.get('/', (req, res) => {
    res.render('layouts/login');
});


module.exports = router;

````

* The code above code allows the routes to be divided up into our three files: login.js, register.js, and update.js
* Each route will now begin with the part assigned to them, so a login route will now be post '/auth/login' and an update route will be post '/user/update/:id', for example
* The get '/' route will remain unchanged because it is inside of the index

* Still inside the auth folder, open up update.js and register.js. Copy and paste in the variables from login.js. Then add module.exports = router.
* Cut and paste the register routes into register.js
* Cut and paste the update routes into update.js
* Now remove any unused variables
* When you have completed the login.js file, it should be left with post '/login', get '/dashboard' and get '/logout'
* When you have completed the update.js file, it should have get '/update/:id', post 'update/:id' and get '/removeUser/:id'
* And lastly register.js should only have get '/register' and post '/register'

* All of the redirect endpoints need to be reviewed to make sure that they point to the new path. "successRedirect: '/dashboard'" is now "successRedirect: '/auth/dashboard'"

## in views/layouts

* Finally all of the post endpoints will need to be reviewed and changed, including the buttons, to reflect the new updated paths.
