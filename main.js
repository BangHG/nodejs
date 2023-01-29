var http = require('http');
var fs = require('fs');
var url = require('url'); // url모듈

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var title = queryData.id;

  if (_url == '/') {
    // _url = '/index.html';
    title = 'WELCOME HOME';
  }
  if (_url == '/favicon.ico') {
    return response.writeHead(404);
  }

  response.writeHead(200);

  fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, content) {
    var template = `
    <!doctype html>
    <html>
    <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    <ul>
    <li><a href="/?id=HTML">HTML</a></li>
    <li><a href="/?id=CSS">CSS</a></li>
    <li><a href="/?id=JavaScript">JavaScript</a></li>
    </ul>
    <h2>${title}</h2>
    <div>${content}</div>
    </body>
    </html>
    `;
    response.end(template);
  });
  // response.end(queryData.id); //쿼리스트링 출력하기!
  //읽어주기
  // response.end(fs.readFileSync(__dirname + _url));

  // __dirname: 현재경로
  console.log(__dirname + _url);
});
app.listen(3000);
