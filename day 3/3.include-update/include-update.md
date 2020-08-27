# Include-update

This section of the exercise will result in the application having full CRUD functionality. When complete, the user should be able to update and/or delete his/her account.

## in views/layouts

* First in your layouts folder, create a landing.ejs file. On line one create a greeting which will take in the user name.

````
<h1>We are so glad you arrived, <%= name %>!</h1>
````

This will become the landing page, where we will first greet the user.

* Next we will neet to  create an update-profile.ejs file in your layouts folder. In this file you will need to  copy and paste the code from 'register.ejs' and delete the password field. Now we will need to make a few more changes to make this our update page. First rename the h1 element to 'Edit' from 'Register', then update the  form attribute to:

````
<form action="/update/<%= id %>" method="POST">
````

* Finally be sure to update the id and name attributes in your inputs with new values for this page ex: name = "newname". You will also need to update the input submit's value attribute to "Update Profile"

````
<input type="submit" value="Update Profile">
````

* Now open up your 'username.ejs' file and add in a button for updating the profile, and another for deleting the profile. Ex:

````
<input type="button" value="Update Profile" onClick="window.location.href='/update/<%= _id %>'">
<br/>
<br/>
<input type="button" value="Delete Profile" onClick="window.location.href='/removeUser/<%= _id %>'">

````

## in routes/login.js

* Now we will need to update our routes to use what we just added. In login.js in your routes folder, create a get '/update/:id' route that takes in the req.params.id and finds a matching record in the database. The route should then render the 'layouts/update-profile' and will passe in the mongodb _id as id.

````
router.get('/update/:id', (req, res) => {
    let id = req.params.id;
    User.findById({
        _id: id
    }, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render('layouts/update-profile', {
                id: id
            });
        }
    });
});
````

* Next we will create a post '/update/:id' route. It will be an async function that will find a user who matches the given id in the database. In three 'if' statements it will compare the user name to the new name, the user email to the new email and whether or not information was entered. Then it will update the data base. the { $set: { name: name } } tells mongodb to look in the document in the name field and change it to the given variable. { new: true } means to return the updated user and not the former one. Each if statement renders the landing page with name, id and email passed in.

````
router.post("/update/:id", async (req, res) => {
  let id = req.params.id;
  let newName = req.body.newname;
  let newEmail = req.body.email;
  let currentUser = await User.findById({
    _id: id,
  });
  if (
    (!newName && !newEmail) ||
    (newName === currentUser.name && newEmail === currentUser.email) ||
    (!newName && email === currentUser.email) ||
    (newName === currentUser.name && !newEmail)
  ) {
    User.findById({ _id: id }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        let id = data._id;
        let name = data.name;
        let email = data.email;
        res.render("layouts/landing", {
          id,
          name,
          email,
        });
      }
    });
  }
  if (
    newName &&
    newName !== currentUser.name &&
    newEmail &&
    newEmail !== currentUser
  ) {
    User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name: newName,
          email: newEmail,
        },
      },
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let id = data._id;
          let name = data.name;
          let email = data.email;
          res.render("layouts/landing", {
            id,
            name,
            email,
          });
        }
      }
    );
  }
  if (newName && newName !== currentUser.name && !newEmail) {
    User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          name: newName,
        },
      },
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let id = data._id;
          let name = data.name;
          let email = data.email;
          res.render("layouts/landing", {
            id,
            name,
            email,
          });
        }
      }
    );
  }
  if (newEmail && newEmail !== currentUser.email && !newName) {
    User.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          email: newEmail,
        },
      },
      {
        new: true,
      },
      (err, data) => {
        if (err) {
          console.log(err);
        } else {
          let id = data._id;
          let name = data.name;
          let email = data.email;
          res.render("layouts/landing", {
            id,
            name,
            email,
          });
        }
      }
    );
  }
});
````

* Finally we will need to create a get '/removeUser/:id' route where mongoose uses the findOneByIdAndRemove and passes in req.params.id to remove the user profile from the database. Upon success, the route will render '/' (login) with the message "profile removed"

````
router.get("/removeUser/:id", (req, res) => {
  let id = req.params.id;
  User.findByIdAndRemove(
    {
      _id: id,
    },
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        req.flash("success", "Profile deleted");
        console.log(data);
        res.redirect("/");
      }
    }
  );
});
````

## in public folder

### This is a fix for error 'CastError: Cast to ObjectId failed for value "{ _id: 'font.css' }" at path "_id" for model "User"'and for css being unavailable to update-profile.ejs

* First go in the 'public' folder make a folder called 'assets'. In the 'assets' folder make two additional folders, one called 'css' and the other called fonts.

* Now move both of the stylesheets into css folder and the font file into fonts folder. Finally move the icon into assets.

## in views/layouts/layout

* Since we moved a few files around, the links will have to be changed in the header in our layout.ejs file. Since the server looks toward the public folder, that part is not included in the path.

````
<link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
<link href="/assets/css/font.css" rel="stylesheet" type="text/css">
<link href="/assets/css/style.css" rel="stylesheet" type="text/css">

````
