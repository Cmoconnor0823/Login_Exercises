# Include-Validation

The main goal of this section of the exercise is to include validation in the register component, i.e. what happens if the email being registered is already in the database, or what happens if a field is not filled out. An ejs partial is added 'register.ejs' and 'username.ejs' is updated.

## in views/layouts

- First inside your views folder, open the username.ejs file and add a button to landing page and a logout button.

```
<input type="button" value="On to landing Page" onClick="window.location.href='/landing/<%= id %>'"/>

<input type="button" value="Logout" onClick="window.location.href='/logout'"/>
```

- Once the above step is completed, the user should now have four options, update profile, delete profile, go to landing page and logout.

## in views/partials

- Now lets review the contents of the partials folder in views. There should be one partial named messages.ejs with the code below inside.

```
<% if(typeof errors !== 'undefined') { %>
    <% errors.forEach((error) => { %>
        <p><%= error.message %></p>
  <% }) %>

<% } %>

```

- We are going to make a second partial called passport-messages.ejs in the partials folder. When you have created the file, include/copy in the code below

```
<% if(typeof error !== 'undefined') { %>
    <p><%= error %></p>
<% } %>

```

- Now that we have our partials completed, we need to include them in the correct .ejs files in the layout folder. The partial messages.js should be included in register.ejs, and passport-messages.ejs should be included in login.ejs.

```
<%- include('../partials/messages') %>
```

```
<%- include('../partials/passport-message') %>
```

## in routes/login.js

- Now that the error messages are updated, open up your routes folder and open the login.js file. Find the router.post '/register', here we will start to include validation.

- First create a variable called errors below your userPassword variable, which should be set equal to an empty array. All error messages will be pushed to this array to be rendered with ejs.

- Next we will need an if statment to check if there is no name or email or password filled out, we will push the error message "Please fill in all fields" to the array.

```
 if (!name || !email || !userPassword) {
        errors.push({
            message: "Please fill in all fields"
        });
    }
```

- The next if statement we need should check if the errors array has any errors and if so render 'layouts/register' with the errors passed through.

```
    if (errors.length > 0) {
        //fails if error
        //This will render a partial ejs
        res.render('layouts/register', {
            errors
        });
```

- Directly below the above if statement we need to add in a else for if there are no errors in the error array, then we need to move on and check to see if the email is already in the database.

```
 } else {
        //if no error passes
        //now looks to see if user already in database
        await User.findOne({
            email: email
        },
```

- If the email that was entered is already in the database, an error should be pushed to the error array ,and 'layouts/register' is rendered with the error.

```
async (err, data) => {
            if (err) {
                console.log(err);
            } else if (data) {
                //user already in database
                //This will render a partial ejs
                errors.push({
                    message: "This email is already registered"
                })
                res.render('layouts/register', {
                    errors
                });
```

- The last else check we need is to see if all the validation passes. If so, the user is saved to the database.

```
            } else {
                const salt = await bcrypt.genSalt(10);
                let password = await bcrypt.hash(userPassword, salt);
                let user = new User({
                    name: name,
                    email: email,
                    password: password
                });
                user.save();
```

- And finally if the user was registered, a flash success message is sent and the view is redirected to 'login.ejs' so the user can log in

````
req.flash('success', 'You are registered and can log in');
                res.redirect('/');
            }
        });
    }

});
````