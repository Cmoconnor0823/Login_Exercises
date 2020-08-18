# Include-update

This section of the exercise achieves CRUD status. The user can update and/or delete his/her account.

## in views/layouts

* create a landing.ejs which takes in the user name, but is different from the 'username.ejs' file. This will become the landing page. 
* create an update-profile.ejs, copy and paste 'register.ejs' and delete the password field. Rename 'Edit'. form action="/update/<%= id %>" method="POST"  and  name = "newname"
* in 'username.ejs' make a button for updating the profile, and another for deleting the profile

````

<input type="button" value="Update Profile" onClick="window.location.href='/update/<%= _id %>'">
<br/>
<br/>
<input type="button" value="Delete Profile" onClick="window.location.href='/removeUser/<%= _id %>'">

````

## in routes/login.js

* create a get '/update/:id' route that takes in the req.params.id and finds a matching record in the database. The route then renders 'layouts/update-profile' and passes in the mongodb _id as id.
* create a post '/update/:id' route. It will be an async function that will find a user who matches the given id in the database. In three 'if' statements it will compare the user name to the new name, the user email to the new email and whether or not information was entered. Then it will update the data base. the { $set: { name: name } } tells mongodb to look in the document in the name field and change it to the given variable. { new: true } means to return the updated user and not the former one. Each if statement renders the landing page with name, id and email passed in.
* create a get '/removeUser/:id' where mongoose uses the findOneByIdAndRemove and passes in req.params.id to remove the user profile from the database. Upon success, the route will render '/' (login) with the message "profile removed"

## in public folder

### This is a fix for error 'CastError: Cast to ObjectId failed for value "{ _id: 'font.css' }" at path "_id" for model "User"'and for css being unavailable to update-profile.ejs

* in the 'public' folder make a folder called 'assets' and in 'assets' folder make two other folders, one called 'css' and the other called fonts.
* move both the stylesheets into css and the font file into fonts. Move the icon into assets.

## in views/layouts/layout

* The links will have to be changed in the header. Because the server looks toward the public folder, that part is not included in the path.

````

<link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
<link href="/assets/css/font.css" rel="stylesheet" type="text/css">
<link href="/assets/css/style.css" rel="stylesheet" type="text/css">

````
