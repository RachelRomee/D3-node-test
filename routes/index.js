/* LOAD ALL DEPENDENCIES
----------------------------------------- */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); // Always load body-parser in any route

/* INDEX ROUTE
----------------------------------------- */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* EXPORT ROUTER
----------------------------------------- */
module.exports = router;
