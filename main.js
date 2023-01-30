var http = require('http');
var fs = require('fs');
var url = require('url'); // url모듈
var qs = require('querystring');

function templateHTML(title, list, body) {
  return `
  <!doctype html>
  <html>
  <head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
  </head>
  <body>
  <h1><a href="/">WEB</a></h1>
  ${list} 
  ${body}
  <a href="/create">create</a>
  </body>
  </html>
  `;
}
function templateList(filelist) {
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  // console.log(url.parse(_url, true));

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (err, filelist) => {
        var title = 'WELCOME HOME';
        var description = 'hello node.js';

        var list = templateList(filelist);

        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>      
          <div>${description}</div>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, 'utf-8', function (err, description) {
        fs.readdir('./data', (err, filelist) => {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>      
            <div>${description}</div>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === '/create') {
    fs.readdir('./data', (err, filelist) => {
      var title = 'WEB - Create';
      var description = 'create';

      var list = templateList(filelist);

      var template = templateHTML(
        title,
        list,
        `
        <style>*{font-family:inherit;width:100%;box-sizing:border-box}</style>
        <form action="/process_create" method="post" style="max-width:300px;">
          <p><input type="text" name="title" placeholder="title"/></p>
          <p>
            <textarea  name="description" placeholder="description" id="" cols="30" rows="10"></textarea>
          </p>
          <p><input type="submit" value="제출" /></p>
        </form>
        `
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === '/process_create') {
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    }); //post로 전송되는 데이터가 많을것을 대비하여,. 콜백을 호출하여 데이터를 조각내어 수신한다
    request.on('end', function () {
      var post = qs.parse(body);
      console.log(`title:${post.title}, desc: ${post.description}`);
      //끝
    });

    response.writeHead(200);
    response.end('did it');
  } else {
    //200은 전송 성공. 404은 실패
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);
