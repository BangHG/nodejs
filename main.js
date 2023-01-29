var http = require('http');
var fs = require('fs');
var url = require('url'); // url모듈

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  console.log(url.parse(_url, true));

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (err, filelist) => {
        // console.log(filelist);
        var title = 'WELCOME HOME';
        var description = 'hello node.js';
        var list = '<ul>';
        var i = 0;
        while (i < filelist.length) {
          list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i = i + 1;
        }
        list = list + '</ul>';
        var template = `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${list} 
        <h2 style="margin:0;padding:0">${title}</h2>      
        <div style="margin:0;padding:0">${description}</div>
        </body>
        </html>
        `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, description) {
        fs.readdir('./data', (err, filelist) => {
          var title = queryData.id;
          var list = '<ul>';
          var i = 0;
          while (i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';
          var template = `
          <!doctype html>
          <html>
          <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
          </head>
          <body>
          <h1><a href="/">WEB</a></h1>
          ${list} 
          <h2 style="margin:0;padding:0">${title}</h2>      
          <div style="margin:0;padding:0">${description}</div>
          </body>
          </html>
          `;
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else {
    //200은 전송 성공. 404은 실패
    response.writeHead(404);
    response.end('Not Found');
  }

  // if (_url == '/') {
  //   // _url = '/index.html';
  //   title = 'WELCOME HOME';
  // }
  // if (_url == '/favicon.ico') {
  //   return response.writeHead(404);
  // }

  // response.end(queryData.id); //쿼리스트링 출력하기!
  //읽어주기
  // response.end(fs.readFileSync(__dirname + _url));

  // __dirname: 현재경로
  // console.log(__dirname + _url);
});
app.listen(3000);
