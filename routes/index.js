'use strict'
var express = require('express');
var router = express.Router();
var fs = require('fs');
router.get('/', function(req, res, next) {
  fs.readFile('public/js/data.js', 'utf-8', function(err, data) {
    res.render('index', {
      items: JSON.parse(data)
    });
  })
})
module.exports = router;
