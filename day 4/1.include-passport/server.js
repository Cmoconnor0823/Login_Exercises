// set up to only use dotenv contents in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const loginRoutes = require('./routes/login');
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

//bring in passport.js
require('./passport/passport')(passport);

//set view-engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

//express-sessions set up
//express-sessions writes a cookie
//cookie stores information server-side
//but is only made for a dev environment
//use for passports as well as ejs
app.use(session({
  secret: SECRET,
  resave: true,
  saveUninitialized: true
}));
//passport middleware
//must go after express-sessions
app.use(passport.initialize());
app.use(passport.session());
//connect-flash set up
app.use(flash());

//sets up global variables for connect-flash
app.use(function (req, res, next) {
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

//middle ware
//cannot use nested object in url, but will filter out query string "?".
app.use(express.urlencoded({
  extended: false
}));
//instead of body parser in order to read req.body
app.use(express.json());
//lets server find css
app.use(express.static('public'));

app.use(expressLayouts);
//include routes
app.use(loginRoutes);

//connect mongoose
mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log('The mon(goose) is on the loose');
  });

//connect server
app.listen(PORT, () => {
  console.log("Tiny electronic ears always listen on port " + PORT);
});