# Include-Messages

The goal for this part of the log in exercise is to render a flash message when the login redirects the user. To this end, the login is now rendered at the GET '/' route, and this will include a button that will direct the user to the registration page. If the user is already registered they should be able to go ahead and log in. If there is a problem with the user's credentials, the user will receive a message telling them as such. The message is sent out/displayed only on a redirect, not on a render.

## in Terminal

* First check to see if you have connect-flash and express-session installed (Hint: look in your package.json)

## in views/layouts

* First open your views folder and open the file 'login.ejs'. You will need to add a button that connects to '/register'; ```` <input type="button" value="Register" onClick="window.location.href='/register'"> ````
* Next in your 'login.ejs', you will need to add in the code to render any error message that might be sent. There is an example included below, but refer to your documentation for more information.

````

<% if( locals.error ){ %>
    <div>
        <p><%= error %></p>
    </div>
    <% } %>

````

## in routes/login.js

* Next open up your login.js file in your routes folder. In the get'/' route, render the 'layouts/login' so that when the user arrives at the site, the user is presented with the layout for the log in page.
* Now we will need to make a get '/register' route that will render the layout from 'layouts/register'
* Next we will need to edit the router.post for '/login'.Now add in an if else statement in the User.findOne({}), to check if data is returned or not. If `data` is returned, we then need to check if the password is correct. If `matched` evaluates to false, there is an error in the password, if `data` is not returned at all, then we know that there is no record of the email in the database

````
router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({
        email: email
    }, async (err, data) => {
        if (err) {
            console.log(err);
        } else {
            if (data) {
                let name = data.name;
                let hashedPassword = data.password;
                let _id = data._id;
                const matched = await bcrypt.compare(password, hashedPassword);
                if (matched) {
                    res.render('layouts/username', {
                        name: name,
                        _id: _id
                    });
                } else {
                    req.flash('error', 'password does not match our records');
                    res.redirect('/');
                }
            } else {
                req.flash('error', 'We do not have that email in our records');
                res.redirect('/');
            }
        }
    });
});
````

* Note that in the example of the new post '/login', in the checks to see if there is an error, we are using a redirect to '/' after using req.flash for the error message.

````

req.flash('error', 'password does not match our records');
                    res.redirect('/');

````

## in Server

* Now that we are done with the routes, open your server.js file and make sure to require connect-flash as flash, and express-session as session ***Note do not change the names we are using to require connect-flash and express-session***
* You will include session and flash below the view engine and above the middleware like the example below shows.

````

app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

````

* Now directly below app.use(flash()), you will need to set the flash global variables. These variables are what the ejs uses to render the messages.

````
app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

````

* Finally we will need to add in one last variable back at the top of your server.js file. ` SECRET = process.env.SECRET; `

## in .env

* Lastly we will need to update our .env file. You will want to create the SECRET we just required back in the server.js page for our express-session in the

`app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true
}));`
