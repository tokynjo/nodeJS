var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;// get all elelment query 
  var txt = q.year + " " + q.month; // vlue
  res.end(txt);
}).listen(8080);