// set up to only use dotenv contents in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const {
  Mongoose
} = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT;

//include mongoose
const mongoose = require('mongoose');

//include Model
const User = require('./models/User')

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
  res.sendFile(__dirname + '/views/index.html');
});
// uses code from bcrypt-demo
app.post('/register', async (req, res) => {
  // variables come from html form property 'name'
  let name = req.body.username;
  let userPassword = req.body.password;
  //here console.log to check if name and password
  //erase afterwards - security
  //console.log(name, userPassword);
  //async function createUser(name, userPassword) 
    try {
      //must salt and then hash before making user
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(userPassword, salt);
      let user = new User({
        name: name,
        password: password
      });
      //saves user to database
      user.save();
      //returns json of user
      res.json(user);
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