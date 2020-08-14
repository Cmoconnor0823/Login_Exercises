# Include-login

This lesson creates a login ejs component. The login is used after registering to sign in to the landing page. If the user's password matches the hashed password in the database the user is let onto the landing page. The login route uses the comparePassword() async function from the original Day 1 bcrypt-demo

## in Terminal

* install express-ejs-layouts- This has been done for you (check your package json file to be sure)

## in views/layouts

* First in 'layout.ejs' replace <%- include('register') %> with <%- body %> This will allow for any view to be shown on the page
* Now make a file called 'login.ejs'
* Next copy the code from 'register.ejs' and add it into 'login.ejs'
* In your 'login.ejs' file change the POST to '/login' and the name field to email. Note that the type should be changed to email and the name attribute must also be email
* Now in 'login.ejs' change all appropriate headings (i.e. Register to Login, etc.)
* Finally back in 'register.ejs' add an email field in between the name and password fields

## in models/User

* Now if you did not add in an email field in your model on day one go back into your model folder and openUser.js. Add an email field, with a type of string, it should be required, and it should be unique

````
    email: {
        type: String,
        unique: true,
        required: true
    }

````

## in server

* Next in your server.js file require express-ejs-layouts as expressLayouts
* Then further down in your server.js, right after the line app.use(express.static('public')) add in the following line of code-  app.use(expressLayouts); - this will allow the <%- body %> in 'layouts/layout'
* Now in app.post '/register', go down, after you have saved your user to the res.render. Instead of rendering the landing page, render 'layouts/login'
* Next create a post '/login' route
* In '/login' post route you just created, write a .findOne() to find a user by email.
* Now inside of User.findOne({ email: email }) use comparePassword() code from bcrypt-demo on day one to compare password to hashed password
* If passwords match, render the code in 'layouts/username', passing in the user's name
* If passwords don't match return a res.json message that the passwords don't match
