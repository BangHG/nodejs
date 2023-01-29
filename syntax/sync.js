var fs = require('fs');

// #동기
// console.log('A');
//##return
// var result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');
// ABC

// #비동기
console.log('A');
//##함수형
fs.readFile('syntax/sample.txt', 'utf8', function (err, result) {
  console.log(result);
});
console.log('C');

// ACB
