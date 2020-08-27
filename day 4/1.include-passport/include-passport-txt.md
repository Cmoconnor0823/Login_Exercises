# Include passport.js

This next section of the lesson is based on a Brad Traversy tutorial called Node.js With Passport Authentication | Full Project. The tutorial can be found ****Ask your teacher where the video is located for your class*****. The boilerplate code is from passport.js docs: http://www.passportjs.org/docs/

This section of the exercise has a lot of copying and pasting. Before diving into this exercise review the video referenced above. Using this code along we will include passport.js in to the login exercise we have been building over the last few lessons. The code is here in case you run into errors or in case the video cannot be provided. In any case you should not directly copy and paste the code included but instead use it as a guide to continue building your login page.

The goal of this section of code is to authenticate with passport.js and to secure routes so that the unauthenticated user cannot arrive by typing in the URL.

## in Terminal

* First you will need to install passport and passport-local. Look in your package json file for "passport": "^0.4.1","passport-local": "^1.0.0".

## in Root Directory

* In the root directory of your project, make a new folder called passport
* Next in the 'passport' folder you ust created, copy and paste the auth.js and passport.js files that will be provided to you.

## in routes/login.js

* Now we are going to update our routes so that the login is handled by passport. You will need to remove all of the post '/login' code, and replace with the code below:

````
//login now handled by passport.js
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
 });

````

* Next we will need to make a get '/logout' route. At the end of your login.js file but before the last line with the code: module.exports = router; you will need to add/copy in the code below.

````

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
});

````

## in views

* Inside the views folder, create a folder named 'partials', and create file named 'messages.ejs'.
* Now inside the 'messages.ejs' file you just created add in the code below:

````
<% if(typeof error !== 'undefined') { %>
    <p><%= error %></p>
<% } %>

````

## in views/layouts

* Now open the 'landing.ejs' file inside your views > layouts folder. We will need to add in a logout button that will use the '/logout' route.

````
<input type="button" value="Logout" onClick="window.location.href='/logout'"/>
````

* Next we will jump to the 'login.ejs' file in views > layouts folder. We will need to include the partial 'messages.ejs' and remove local error. Note that we to leave in the  locals.success for logout

````
<%- include('../partials/messages') %> <% if( locals.success ){ %>
<div>
  <p><%= success %></p>
</div>
<% } %>

````

## in server

* Now we will need to update our server.js file back in the root of our project. Add in a ` const passport = require('passport'); ` to require passport as passport.
* Now we need to bring in (require) the passport.js file we created in our passport folder. (path './passport/passport'). With this require we will need to pass in the passport module. Copy the line of code into your server.js file after your const require's but before your app.set.

````
require('./passport/passport')(passport);
````

## In routes/login.js

* To wrap things up, open your login.js file again in your routes folder and bring in/require  ` const { ensureAuthenticated } = require('../passport/auth') ` at the end of the const require's but before your router.get

* Now on the routes that you wish to secure, include ensureAuthenticated middleware, thusly: router.get('/dashboard', ensureAuthenticated, async (req, res) => {
