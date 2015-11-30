'use strict'
var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');
var path = require('path');
var co = require('co');
var allItems = [];
var urls = [];
for(var i = 0; i < 434; i++) {
  urls.push("http://www.douban.com/group/asshole/discussion?start="+i*25+"&type=essence");
}
var readUrl = function (url){
  return new Promise(function (resolve, reject){
    console.log("正在遍历："+url);
    let items = [];
    let delay = parseInt((Math.random() * 30000000) % 2000, 10);
    setTimeout(function(){
      superagent.get(url).end(function (err, sres) {
        if (err) {
          reject(err);
        }
        var $ = cheerio.load(sres.text);
        $('.olt tr').each(function (idx, element){
          var $element = $(element);
          items.push({
            title:$element.find('.title a').text(),
            link:$element.find('.title a').attr('href'),
            num:parseInt($element.find('td').eq(2).text())
          })
        })
        resolve(items);
      })
    },delay)
  });  
}
function *getData(){
  for(let url of urls){
    var data = yield readUrl(url);
    allItems = allItems.concat(data);
  }
}
function getSortFun(order, sortBy) {
  var ordAlpah = (order == 'asc') ? '>' : '<';
  var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
  return sortFun;
}
co(getData).then(function (){
  allItems.sort(getSortFun('desc', 'num'));
  fs.writeFile(path.join('public/demo/3', 'data.js'), JSON.stringify(allItems), function (err) {
    if (err) throw err;
    console.log("Export Account Success!");
  });
});

