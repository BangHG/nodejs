module.exports = {
  HTML: function (title, list, body, ctrl) {
    return `
    <!doctype html>
    <html>
    <head>
    <title>WEB - ${title}</title>
    <meta charset="utf-8">
    <style>
    *{font-family:inherit;box-sizing:border-box}
    html{font-family:'맑은 고딕','나눔 고딕','NanumSquare',Noto Sans KR ,'돋움', sans-serif;font-size:18px;word-break:keep-all;} form input:not([type=hidden],[value="DELETE"]),form textarea{width:100%} 
    </style>
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${body}
    </body>
    </html>
    `;
  },
  List: function (filelist) {
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length) {
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
  },
};
