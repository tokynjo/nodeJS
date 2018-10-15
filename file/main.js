var http = require('http');
var fs = require('fs');
var url = require('url');


http.createServer(function (req, res) {
	
	var q = url.parse(req.url, true).query;
	if(typeof (q.action) != "udefined"){
		if(q.action == "create"){
			fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
			if (err) throw err;
				console.log('Saved!');
			}); 
		}
		else if(q.action == "delete"){
			fs.unlink('mynewfile2.txt', function (err) {
			if (err){
				res.writeHead(404, {'Content-Type': 'text/html'});
				return res.end("404 Not Found");
			}
			res.writeHead(200, {'Content-Type': 'text/html'});
			return res.end("file detele success");
			}); 
		}
		else{
			fs.readFile('demofile1.html', function(err, data) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(data);
			res.end();
  });
		}
	}
 
}).listen(8080); 