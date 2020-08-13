# Exercise-Tracker Repo

This repository was made as a demonstration for how to get started on the "Exercise Tracker" final project in PCC. The css and basic layout will be used for this weeklong demo/exercise on how to build a simple user login/authentication component. It might be helpful, before adding the bcryptjs demo code to this repository, to review the basic express/mongoose server set up.

## File Structure and Architecture

* The repo has already been created with npm init -y, creating a package json and package lock json. You will need to edit this file with your name and a short description
* The included dependencies are express and mongoose
* The included dev dependencies are dotenv (to store hidden variables) and nodemon (to have a server that will automatically restart with any changes)
* The start scripts were added in the package json, both node start - server.js and dev - nodemon server.js
* Now take a look at the views folder, this contains the html form - which will eventually become ejs
* Now take a look at the public folder this contains the CSS - and additional items (a font and an icon) that are there to make everything local
* Now take a look at the models folder, this contains a file User.js with a user mongoose model
* Now take a look at the gitignore file. This is included so that the node_modules and .env file are not saved/exposed
* Note that the .env file is there primarily to get into the habit of using .env and .gitignore

## Models / User Schema

* Now open your User.js file in the models folder. Note that the user model is blank.
* You will need to add in name and password fields (and optionally a timestamp) - Note that at a later point we will add an email field as well
* Note that the provided code is boilerplate, and is done slightly differently in some tutorials, but the outcome is the same
* It may be helpful to remember that the model is how the server interacts with the database.

## Server

### Variables

* Review the code in the server.js file.
* The first line tells our app that if the environment is development, to use .env variables. (If the environment were production, the host site would have it's own way of storing these variables.)
* Next we require express and Mongoose and set app variable to equal express()
* Now we have a const PORT set equal to the PORT variable stored in our .env file. Open the .env to see that the PORT is set to 3000. (Technically this should be an 'or' statement; with one port for production, ans a second port for your app in development)

### Model

* There is a space to include the model. Set it to const User and require the model you created earlier. Do not forget that in our app  a) it is User with a capital 'U' due to how we named it in our model (and it is standard to use a capitial letter here), and b) when you see 'User' think 'database'.
* ex: const User = require('file path to User.js here ');

### Middleware

*Those methods/functions/operations that are called BETWEEN processing the Request and sending the Response in your application method.*

* The next lines are our middleware you can reference this portion from a prior document, or look  at your documentation.
* Express urlencoded lets the url make the req.body. There are several options here, and for more information refer to your documentation. In this case we want to set extended to false to parse our data with the queryString library
* express.json() replaces body-parser, allows server to read req.body
* express.static() allows the server to read the contents of the public folder (i.e. css, javascript, images, icons, fonts etc.)

### Routes

* app.get '/' -What to serve up at our landing for our site
* res.sendFile() serves up the html file
* Since we are using the template file from the Exercise Traceker project,there is a space for an additional GET route and a POST route leave these empty for now.

### Connect Mongoose

* Now we connect to our database with mongoose. Our first parameter, process.env.DATABASE_URI, is stored in our .env file
* There are two additional objects to be passed to mongoose to avoid a deprication error: { useNewUrlParser: true, useUnifiedTopology: true }
* This function connects MongoDB to the server, the mongoose model acts as the 'go-between'

### App listen

* app.listen starts the server listening in a port -(the port stored in our .env file)
* Now go ahead and open your terminal and type in npm run dev to start (with nodemon)
* Youe should see console.logs from the database and the server telling you that mongoose is connected and which port your site is being hosted on

## Views

* Now go to your view folder and review the contents.
* The HTML is a form which POSTs information to the route endpoint
* It might be useful to remember that the variables in the 'route' code come from the 'name' property in the HTML form, as do the endpoints
* It is also good to remember that the server does not automatically 'see' the HTML or CSS (or javascript). The server needs to be pointed in their direction.
