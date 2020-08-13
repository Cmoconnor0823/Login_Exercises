# Exercise-Tracker Repo

This repository came from a daily exercise made as a demonstration
for how to get started on the "Exercise Tracker" final project in PCC.
The css and basic layout will be used for this weeklong demo/exercise on how
to build a simple user login/authentication component. It might be helpful, before
adding the bcryptjs demo code to this repository, to review the basic express/mongoose
server set up.

## File Structure and Architecture

* The repo has already been created with npm init -y, creating a package json and package lock json, you will need to edit this file with your name and a short description
* The included dependencies are express and mongoose
* The included dev dependencies are dotenv (to store hidden variables) and nodemon (to have a server that will automatically restart with any changes)
* The start scripts were added in the package json, both node start - server.js and dev - nodemon server.js
* There is a views folder that contains the html form - which will eventually become ejs
* There is a public folder that contains the CSS - and additional items (a font and an icon) that are there to make everything local
* There is a models folder with a user mongoose model
* There is a gitignore file so that the node_modules and .env file are not saved/exposed
* The .env file is there mostly to get into the habit of using .env and .gitignore

## Models / User Schema

* The user model is blank in the repo
* You will need to add in name and password fields (and optionally a timestamp) - at a later point we will add an email field as well
* The provided code is boilerplate, and is done slightly differently in some tutorials, but the outcome is the same
* It might be helpful to remember that the model is how the server interacts with the database.

## Server

### Variables

* The first line says that if the environment is development, to use .env variables. If the environment were production, the host site would have it's own way of storing these variables.
* Require express and Mongoose
* set app variable
* put PORT in .env to demonstrate how to use .env (Technically this should be an 'or' statement; one for production, one for dev)

### Model

* There is a space to include the model. This is a good place to remind the students that a) it is User with a capital 'U', and b) when they see 'User' they should think 'database'.

### Middleware

* can be cut and pasted
* Express urlencoded lets the url make the req.body. False means that it cannot have nested code in the URL, but can include queries? (Or at least that is my understanding)
* express.json() replaces body-parser, allows server to read req.body
* express.static() allows the server to read that which is in the public folder (i.e. css, javascript, images, icons, fonts etc.)

### Routes

* '/'
* res.sendFile() serves up the html file
* There is a space for an additional GET route and a POST route used in the original exercise

### Connect Mongoose

* There are two additional objects to be passed to mongoose to avoid a deprication error, they will be added in another exercise
* connects MongoDB to the server, the mongoose model acts as the 'go-between'

### App listen

* starts the server listening in a port
* open terminal and type in npm run dev to start (with nodemon)
* Should see console.logs from the database and the server 

## Views

* The HTML is a form which POSTs information to the route endpoint
* It might be useful to remind the students that the variables in the 'route' code come from the 'name' property in the HTML form, as do the endpoints
* It is also good to remind the students that the server does not automatically 'see' the HTML or CSS (or javascript). The server needs to be pointed in their direction.