/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express'); // For routing
const path = require('path');
const request = require('request');
const session = require('express-session');
const compression = require('compression'); // Compression backend
const bodyParser = require('body-parser'); // For reading post requests (form submit (POST)) For ex: <input type='text' name='username' /> on post: req.body.username = username. See route!

/* DEPENDENCIES CONFIGURATION
----------------------------------------- */
const app = express(); // Declare the app > instead of express.use(..) > app.use(..)
const http = require('http').Server(app); // Always http even if it is https
require('dotenv').config(); // Needed for accessing .env > like this > process.env.PORT (Variable name in capitals, declared in .env)

/* SESSIONS CONFIGURATION
----------------------------------------- */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

/* MONGODB CONFIGURATION
----------------------------------------- */
const MongoClient = require("mongodb").MongoClient;
const dbConfig = process.env.MONGODB_URL;

MongoClient.connect(dbConfig, (err, database) => {
  if (err)
    return console.log(err)
  db = database
});

/* SET PORT
----------------------------------------- */
const port = process.env.PORT || 3000; // Set port through .env, if not there use 3000. Digital ocean, set PORT=80 in .env (Heroku auto), check Amazon

/* ENABLE CACHE AND COMPRESSION
----------------------------------------- */
app.set('view cache', true); // Enable caching, for not unnecessesary loading files which have been cached already.
app.use(compression()); // NodeJS compression, package for reducing filesize while rendering

/* LOAD ALL ROUTERS
----------------------------------------- */
const indexRouter = require('./routes/index');

/* MIDDLEWARE FOR THE VIEW ENGINE
----------------------------------------- */
app.set('views', path.join(__dirname, 'views')); // Declare the folder with all views. __dirname is the root
app.set('view engine', 'ejs'); // Always declare the view engine, in this case EJS

/* BODY-PARSER FOR READING POST REQUESTS
----------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* INITIALIZE ROUTES
----------------------------------------- */
app.use(express.static('public')); // For server static files
app.use('/', indexRouter);

/* 404 PAGE
----------------------------------------- */
app.enable('verbose errors'); // If /... doesn't exist as route, always render 404 page.
app.use(function(req, res, next) {
  res.render('error/404');
});

/* START THE NPM SERVER
----------------------------------------- */
http.listen(port, function() {
  console.log(`Server started on http://localhost:${port}`);
});
