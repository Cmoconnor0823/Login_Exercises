// set up to only use dotenv contents in development
if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const express = require('express');
//require mongoose
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;

//include Model
const User = require('./models/User');

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

//post to "/api/daily-exercise/user"


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
