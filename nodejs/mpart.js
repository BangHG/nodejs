// 모듈! 객체보다 더 큰 정리정돈.. 모듈

var M = {
  v: 'v',
  f: function () {
    console.log(this.v);
  },
};

M.f();

module.exports = M;
//M이라는 객체를 외부에서 사용할수 있게 하겠습니다!
