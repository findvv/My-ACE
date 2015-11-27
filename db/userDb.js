// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
// var jsonWrite = function (res, result) {
//     res.json(result);
// };

module.exports = {
  isRight: function (req, res, next) {
    // 获取前台页面传过来的参数
    var param = req.body;
    pool.getConnection(function(err, connection) {
      connection.query($sql.queryPassword,function(err, result) {
        res.send(result[0].password == param.password);
        connection.release();
      });
    });
  }
};