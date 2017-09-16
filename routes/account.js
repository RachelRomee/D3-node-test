/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passwordHash = require('password-hash');

/* LOAD ALL MODULES
----------------------------------------- */
const account = require('../modules/account'); // Load module from module folder

/* MAIN ROUTE
----------------------------------------- */
router.get('/', function(req, res, next) {
  // If /account but nothing after, then use this route
  res.redirect('/account/login'); // Redirect to account/login > then /login route is initialized
});

/* LOGIN ROUTE
----------------------------------------- */
router.get('/login', function(req, res, next) {
  res.render('account/login');
});

/* REGISTER ROUTE
----------------------------------------- */
router.get('/signup', function(req, res, next) {
  res.render('account/signup');
});


router.post('/signup', account.create, function(req, res, next) { // To create new account & handle form data, post request is required
  // account.create has access to all data from the post request, because all req, res variables are defined there.
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
