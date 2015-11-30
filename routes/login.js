var express = require('express');
var router = express.Router();
var userDb = require('../db/userDb.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/edit', function(req, res, next) {
  userDb.isRight(req, res, next);
});
module.exports = router;
