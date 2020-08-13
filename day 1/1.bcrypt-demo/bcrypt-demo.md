# Bcrypt Demo

## The most basic encrypted login

### Set up demo

* install npm - npm init -y --This has been done for you
* install bcryptjs and nodemon -- This has been done for you
* In your package.json add in your start script--  "start": "nodemon demo.js"
* Now in demo.js uncomment the first line to require bcryptjs
* To run the demo.js code type npm run start

## This portion of code will be in the registration part of login-exercise

### Make a user with an encrypted password

* In your demo.jd file take a look at the makePassword function. It takes in a password, and is asynchronous.
* For our example there is a user already defined for you.
* Next we created a variable salt, to await the generation of a salt - we use await so that it does not return undefined
* Now we console.log the salt to see what was generated for us. -Comment out this console.log before moving on
* Next we hash the password stored in our user. bcrypt.hash takes in our password (text) and the (salt) we created above.
* Uncomment out console.log(user); and run (npm run start)the function to display salted/hashed password. After you have this logged to your console, comment the log back out.

## This portion of code will be in the login

### Compare the user's password in the database with password entered upon logging in

* Remove the comment /* around the async function and review it.
* The async function comparePassword takes in a password and a hashed password
* The function awaits bcryptjs method compare(); It will then compare the two passwords and will return a boolean
* Replace the <hashedpasswordhere> with the hashed password string (including quotes)
* Now run your file one more time.
* If passwords match it will return true. (Later for our example we will use it to authenticate the user and if true they can enter the site)
* If the passwords don't match it will return false. (Later in our example user is not authenticated and can be directed to retry.)
