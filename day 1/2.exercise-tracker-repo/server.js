// set up to only use dotenv contents in development
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
//require mongoose
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;

const bcrypt = require('bcryptjs');

//include Model
const User = require('./models/User');

//Middleware
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

//post to "/register"
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

//get on '/api/daily-exercise/users'

//connect mongoose
mongoose.connect(process.env.DATABASE_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
  },
  ()=>{
    console.log('The mon(goose) is on the loose');
  });
//connect server
app.listen(PORT, ()=> {
  console.log("Tiny electronic ears always listen on port " + PORT);
});
