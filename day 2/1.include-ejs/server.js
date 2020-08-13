// set up to only use dotenv contents in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT;

//include Model
//When see User think database
const User = require('./models/User');

//set view-engine
//set assigns particular value to folder and files
//view engine is by default html, here we set it to ejs
app.set('view engine', 'ejs');
//tells server to look in the 'views' folder for ejs
app.set('views', __dirname + '/views');
//sets 'layout' in 'layouts' as main page
app.set('layout', 'layouts/layout');

//middle ware
//cannot use nested object in url, but will filter out query string "?".
app.use(express.urlencoded({
  extended: false
}));
//instead of body parser in order to read req.body
app.use(express.json())
//lets server find css
app.use(express.static('public'));
//lets server send html to route '/'.
app.get('/', (req, res) => {
  //renders file 'layout' in folder 'layouts'
  res.render('layouts/layout');
});

app.post('/register', async (req, res) => {
  let name = req.body.username;
  let userPassword = req.body.password;
  //async function createUser(name, userPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(userPassword, salt);
      let user = new User({
        name: name,
        password: password
      });
      user.save();
      //render user name
      res.render('layouts/username', {name: user.name});
    } catch (err) {
      console.log(err);
    }
});

//connect mongoose
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('The mon(goose) is on the loose');
  });
//connect server
app.listen(PORT, () => {
  console.log("Tiny electronic ears always listen on port " + PORT);
});