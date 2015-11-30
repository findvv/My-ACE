var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var pool  = mysql.createPool($util.extend({}, $conf.mysql));
module.exports = {
  isRight: function (req, res, next) {
    var param = req.body;
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryPassword,function(err, result) {
        if (result[0].password == param.password) {
          res.send('hello');
        }
        else{
          res.redirect('/404');
        }
        connection.release();
      });
    });
  }
};