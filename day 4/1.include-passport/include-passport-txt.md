# Include passport.js

This entire section of code is based on a Brad Traversy tutorial called Node.js With Passport Authentication | Full Project. The tutorial can be found ****Ask your teacher where the video is located for your class*****. The boilerplate code is from passport.js docs: http://www.passportjs.org/docs/

This section of the exercise has a lot of copying and pasting. Before diving into this exercise review the video referenced above. Using this code along we will include passport.js in to the login exercise we have been building over the last few lessons. The code is here in case you run into errors or in case the video cannot be provided. In any case you should not directly copy and paste the code included but instead use it as a guide to continue building your login page.

The goal of this section of code is to authenticate with passport.js and to secure routes so that the unauthenticated user cannot arrive by typing in the URL.

## in Terminal

* install passport and passport-local

## in Root Directory

* make a file called passport
* in 'passport' copy and paste the auth.js and passport.js provided

## in routes/login.js

* remove post '/login' code. Replace with this:

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

* make a get '/logout' route

````

router.get('/logout', ensureAuthenticated, (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
});

````

## in Views

* make a folder called 'partials' with a file called 'messages.ejs'
* in 'messages.ejs':

````
<% if(typeof error !== 'undefined') { %>
    <p><%= error %></p>
<% } %>

````

## in views/layouts

* in 'landing.ejs' make a button the '/logout' route
* in 'login.ejs' include the partial 'messages.ejs' and remove locals.error code (leave locals.success for logout)

## in Server

* require passport as passport
* bring in (require) the path './passport/passport' and pass in the passport module (i.e. require('./passport/passport')(passport);)

## back in routes/login.js

* bring in/require  const { ensureAuthenticated } = require('../passport/auth')
* on routes that you wish to secure, include ensureAuthenticated middleware, thusly: router.get('/dashboard', ensureAuthenticated, async (req, res) => {
   
