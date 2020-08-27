# Include-Validation

The main goal of this lesson of the exercise is to include validation in the register component, i.e. what happens if the email being registered is already in the database, or what happens if a field is not filled out. An ejs partial is added 'register.ejs' and 'username.ejs' is updated.

## in views/layouts

* in username.ejs add a button to landing page and a logout button. The user should now have four options, update profile, delete profile, go to landing page and logout.

## in views/partials

* there should now be one partial named messages.ejs

````
<% if(typeof errors !== 'undefined') { %>
    <% errors.forEach((error) => { %>
        <p><%= error.message %></p>
  <% }) %>
    
<% } %>

````

* make another called passport-messages.ejs

````
<% if(typeof error !== 'undefined') { %>
    <p><%= error %></p>
<% } %>

````

* messages.js is included in registration.ejs
* passport-messages.ejs is included in login.ejs

## in routes/login.js

* in router.post '/register' start to include validation
* create a variable called errors, which is an empty array. All error messages will be pushed to array to be rendered with ejs.
* if there is no name or email or password filled out push the error message to the array.
* if the errors array has errors render 'layouts/register' with the errors passed through.
* if there are no errors the database is checked to see if the email is already in the database.
* if the email is in the database an error is pushed to the array and 'layouts/register' is rendered with the error.
* if all the validation passes, the user is saved to the database.
* a flash success message is sent and the view is redirected to 'login.ejs' so the user can log in
