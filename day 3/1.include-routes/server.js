// set up to only use dotenv contents in development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const loginRoutes = require('./routes/login');
const PORT = process.env.PORT;

//set view-engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

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