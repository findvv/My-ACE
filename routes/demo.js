var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET users listing. */
router.get('/1', function(req, res, next) {
  res.render('demo/1');
});
router.get('/2', function(req, res, next) {
  res.render('demo/2');
});
router.get('/3', function(req, res, next) {
  fs.readFile('public/demo/3/data.js', 'utf-8', function(err, data) {
    res.render('demo/3', {
      items: JSON.parse(data)
    });
  })
})
module.exports = router;
