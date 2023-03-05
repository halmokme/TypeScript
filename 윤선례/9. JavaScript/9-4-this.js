console.log(this);
// 브라우저 환경에서는 Window가 this 객체, 따라서 Window 호출됨

function simpleFunc() {
  console.log(this);
}
simpleFunc();
console.clear();
// 글로벌에서 함수를 호출하는 것은 Window에서 호출하는 것과 같음, window.simpleFunc()와 같다
// 따라서 Window 호출됨

class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase();
// counter에서 increase를 호출했으므로
// 호출한 Counter 클래스 출력. Counter {count: 0, increase: ƒ}

const caller = counter.increase;
// caller 변수에 counter 안의 increase 함수를 할당한 뒤 호출하면
caller();
// undefined가 출력된다. 왜 그럴까?

// const, let으로 선언한 변수는 window에 등록되어 있지 않다. => this는 정보를 잃음
// 그래서 caller를 호출하는 것은 window도, 그 어떤 오브젝트도 아니어서 undefined가 출력된다.

// 기본적으로 함수를 정의하면 정의된 함수는 글로벌 객체에서 접근이 가능하다.
function helloWorld() {
  console.log("hello");
}
window.helloWorld(); // 'hello'

// 그러나 const, let 키워드로 변수를 선언하면 선언된 변수는 window에 등록되지 않는다
const coffee = "americano";
let juice = "strawberry juice";
// window.coffee; // 글로벌 객체에서 접근 불가
// window.juice; // 글로벌 객체에서 접근 불가
// 블럭을 이용해 Local Scope에서 작성한 함수, 변수가 아닌
// 글로벌적으로 (파일 최상위) 선언한 것은 최상위에서 바로 접근이 가능하다.
helloWorld();
console.log(juice);
console.log(coffee);
// 함수는 글로벌 객체에 등록 되어서, 글로벌 객체에서도 이용이 가능 window.helloWorld
// 변수는 글로벌 객체 안에 등록되지 않는다
// 예외 상황 > var 키워드. window에 등록되지만 호이스팅 문제, 선언했는데 재정의 되는 등 로직 문제로 사용하지 않아야 함
var badVar = "bad";
console.log(window.badVar);

//다른 클래스에 있는 함수가 this를 호출한다면, 불러온 클래스에선 어떤 값이 출력될까?
class ChiChi {}
const chichi = new ChiChi();
chichi.run = counter.increase;
chichi.run();
// increase 함수가 호출되고 console.log(this)가 ChiChi를 가리키므로, ChiChi 자체가 출력됨
// 이처럼 자바스크립트의 this 정보는, 함수를 다른 곳으로 할당하는 순간 잃어버림
// 오브젝트와 함수 관계를 묶기 위해서 bind를 사용해야 한다

// (23) const caller = counter.increase 를
// const caller = counter.increase.bind(counter)로 수정하면
// this는 bind로 함께 묶인 Counter를 가리키게 된다

// JS에서 this는 호출자, 호출하는 문맥에 따라 변경될 수 있으므로
// 오브젝트와 연결하고 싶다면 bind 함수로 묶어줘야 한다.

// binding을 일일이 할 필요 없이
// 클래스 내부에서 함수를 선언할 때 화살표 함수를 사용하면, bind 없이도 묶여있는 것을 확인할 수 있다

// arrow function은, 다른 프로그래밍 언어에서 클래스 안의 this를 이용하면 자기 자신을 가리키는 것처럼
// 선언될 당시의 자기 스코프(문맥)의 this context를 유지한다.

// JS에서 this는 문맥에 따라 변경될 수 있으므로
// 1. bind를 호출하거나
// 2. class 내부에 binding 하고 싶은 함수가 있다면 / this에 접근하는 함수가 있다면 arrow function 사용
// this 때문에 날 오류를 줄일 수 있다
