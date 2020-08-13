// set up to only use dotenv contents in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require('bcryptjs');
const expressLayouts = require('express-ejs-layouts');
const PORT = process.env.PORT;

//include Model
const User = require('./models/User');

//the 'sets' assign folders/files
//set view-engine
app.set('view engine', 'ejs');
//points to views folder
//via express-ejs-layouts allows server to "see" any file in views
app.set('views', __dirname + '/views');
//sets 'layout'; in 'layouts' as main ejs file
app.set('layout', 'layouts/layout');

//the uses are middle ware
//cannot use nested object in url, but will filter out query string "?".
app.use(express.urlencoded({
  extended: false
}));
//instead of body parser in order to read req.body
app.use(express.json())
//lets server find css
app.use(express.static('public'));
app.use(expressLayouts);

//lets server send html to route '/'.
app.get('/', (req, res) => {
  //renders file 'layout' in folder 'layouts'
  res.render('layouts/register');
});

app.post('/register', async (req, res) => {
  let name = req.body.username;
  let email = req.body.email;
  let userPassword = req.body.password;
  //async function createUser(name, userPassword) {
    try {
      const salt = await bcrypt.genSalt(10);
      let password = await bcrypt.hash(userPassword, salt);
      let user = new User({
        name: name,
        email: email,
        password: password
      });
      user.save();
      //render login
      res.render('layouts/login');
    } catch (err) {
      console.log(err);
    }
  
});

app.post('/login', (req, res) => {
let email = req.body.email;
let password = req.body.password;
User.findOne({ email: email}, async (err, data)=> {
  try{
  if (err) {
    console.log(err);
  } else {
    let name = data.name;
    let hashedPassword = data.password;
    const matched = await bcrypt.compare(password, hashedPassword);

    // the hash can then retrieve the information
    // it returns true or false 
    if (matched) {
        res.render('layouts/username' , { name: name});
    } else {
        res.json({"msg":"They don't match"});
    }
  }} catch(err){
    console.log(err);
  }
});
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