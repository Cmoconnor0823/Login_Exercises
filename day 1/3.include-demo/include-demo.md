# Include bcrypt-demo Code into Exercise-Tracker Repo

* Now we are going to include the code from the bcrypt exercise into our exercise tracker project.
* First you will need to install bcryptjs (check your package json to make sure it is listed) and require bcrypt in your server file.
* Now in server.js make a POST request to the following route '/register'
* Now open your HTML in views make sure the api endpoints match
* Back in your server POST route add in the code from bcrypt-demo, async makePassword(password) function
* Once you think you updated the code correctly open your terminal and start your server to test your site
* When you enter a username and password In the HTML form and click submit, you should see your username and a hashed password saved user returned in a in json format
