module.exports = function() {

  /* LOAD ALL DEPENDENCIES
  ----------------------------------------- */
  const express = require('express');
  const router = express.Router();
  const request = require('request');

  /* MAIN ROUTE
  ----------------------------------------- */
  router.get('/', function(req, res, next) {

  });

  /* EXPORT ROUTER
  ----------------------------------------- */
  return router;
}
