var http = require('http');
var fs = require('fs');
var app = http.createServer(function (req, res) {
  var url = req.url;
  if (req.url === '/') {
    url = '/repeat.html';
  } else {
    res.writeHead(404);
    res.end('not found');
  }
  res.writeHead(200);

  fs.readFile(url, 'utf-8');
  res.end(fs.readFileSync(__dirname + url));

  console.log(__dirname + url);
});

app.listen(3000);
