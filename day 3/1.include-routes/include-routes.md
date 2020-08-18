# Include - Routes

In this lesson, the main objective is to move the routes off the server and into their own folder/file. We will also add in some addithonal information to 'mongoose.connect()' in order to remove several deprication warnings. See your documentation for more information.

## in Root Directory

* First in the root directory of your project, create a folder called 'routes' and add in a file named 'login.js'

## in 'routes/login.js'

* Now open login.js. At the top you will need to require the following:

````
const router = require('express').Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User');
````

* At the end of your login.js file dont forget to add ````module.exports = router;````
* Now you will want to copy and paste all of your routes from server.js into 'login.js'

* Now because we chose to use the variable name router rather than app, make sure you update all the routes from 'app' to 'router'

* In your router.post to in '/login', check to make sure that if password does not match, or res.redirect will direct our user to '/register'

## in server

* Now that we have cleaned up our server file, make sure to require 'loginRoutes' as ````const loginRoutes = require('./routes/login');````
* Next, right above where your mongoose.connect() should be, make sure you include loginRoutes; ```` app.use(loginRoutes); ````
* Finally lets update our mongoose.connect(). You will want to copy and paste the following objects to get rid of any deprication warnings:

````
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log('The mon(goose) is on the loose');
});

````

* For more information on the information we included in your mongoose.connect refer back to the documentation for mongoose.