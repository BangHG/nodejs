// 42. javascript 객체-데이터와 처리방법을 담는 그릇으로서 객체
var v1 = 'v1';
v1 = 'egoing'; //누군가 이런 코드를 끼워넣었을때?
var v2 = 'v2';
// 1억개의 코드가 있을때?

// -> 객체가 널 살릴 것이다..

// 연관된 데이터의 변수를 한 객체에 모아서 정리할 수 있다. (위 코드를 아래와 같이..)
// = 객체지향 (코드의 복잡성을 낮추는 수납상자! 서로 연관된 데이터와 그 데이터를 처리하는 함수를 그룹핑)
var o = {
  v1: 'v1',
  v2: 'v2',
  f1: function () {
    // console.log(o.v1);
    console.log(this.v1);
  },
  f2: function () {
    // console.log(o.v2);
    console.log(this.v2);
  },
};

function f1() {
  console.log(o.v1);
}
function f2() {
  console.log(o.v2);
}

// 이런 처리문이 있을때..
// 누군가 또 같은 이름의 함수를 만들었을때?? (ㄷㄷ)
f1();
f2();

o.f1();
o.f2();

// 이럴 때도 객체가 널 살리리라..
