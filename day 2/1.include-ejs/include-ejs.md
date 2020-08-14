# Include ejs

This lesson will take the completed repo/code from day 1 and will add in ejs. The goal is to register a user and then land on a page that displays the user's name.

## In the terminal

* install ejs- this has been done for you, (check your package json file to be sure)

## In views

* Now in your views folder, create a new folder called 'layouts'
*Then move 'layout.html' into 'layouts' folder you just created

### in views/layouts

* Now we are going to update our HTML file to work with ejs. First change the name of 'layout.html' to 'layout.ejs'
* Now in your layouts folder, create a file called 'register.ejs'
* Back in your layouts file, remove the code between the body tags of 'layout.ejs' and put in 'register.ejs'
* Next change <h1> tags in 'register' to say 'Register'
* Then back in in 'layout.ejs' include 'register' ( <%- include('register') %> ) where the code you removed the code earlier
* Next change title in 'layout.ejs' to say login exercise
* Now in your layouts folder create a 'username.ejs' file and add the line: <h1>Hello, <%= name %> <h2> 

### in server

* Next we will set the view engine, the views folder and 'layouts/layout' as the main ejs file. Add the code below into your server file below your model import but before your middleware.

````
//copy and paste
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

````

* Now in the get'/' route, instead of res.sendFile + html, you will want to render 'layouts/layout' which displays the 'register' view
* Finally instead of returning the user in json format, in your res.render, change the code to render 'layouts/username', and pass in the user name.
