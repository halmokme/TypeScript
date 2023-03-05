const a = {};
const b = {};
console.log(a);
console.log(b);
// proto가 들어있고, proto는 Object 라는 것을 알 수 있다.
// => 자바스크립트에서 모든 오브젝트는 Object라는 프로토를 상속한다.

console.log(a.__proto__ === b.__proto__);
// a와 b는 동일한 Object의 proto를 상속함

const array = [];
console.log(array.push(1));
// array에도, Array라는 proto를 가지고 있음
// array -> Array -> Object 순으로 상속함

console.clear();

function CoffeeMachine(beans) {
  this.beans = beans;
  // 인스턴스 멤버 레벨
  // this.makeCoffee = (shots) => {
  //   console.log("만드는 중... ☕️");
  // };
}

// 프로토타입 멤버 레벨
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log("만드는 중... ☕️");
};
const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);
// machine -> CoffeeMachine -> Object 순으로 상속함

// 우유를 받아오는 LatteMachine
function LatteMachine(milk) {
  this.milk = milk;
}
// LatteMachine을, 앞에서 만든 CoffeeMachine 안의 makeCoffee가 있는 것으로 연결하기 위해 아래처럼 작성
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);
// LatteMachine은 CoffeeMachine을 상속, CoffeeMachine은 Object를 상속하게 된다

// 타입을 정의하지 않고 아무거나 전달해도 되는 JS. 그래서 TS를 사용하는 것이 좋다
const latteMachine = new LatteMachine(123);
// (41) 위에서 지정했기 때문에 latteMachine에서도 makeCoffee 함수를 이용할 수 있게 된다
console.log(latteMachine);
latteMachine.makeCoffee();

// js는 ts처럼 interface나 generic 같은 것을 사용할 순 없지만 prototype을 이용해 상속을 구현할 수 있다

// 프로토타입은? 자바스크립트에서 객체 지향 프로그래밍, 즉 상속을 할 수 있고, 코드를 재사용 하기 위해 만들어졌다

// 타입스크립트 플레이그라운드에서 확인 했을 때, 클래스로 작성하고 Target을 ES5로 바꾸면 상속이 prototype으로 만들어져 있고, let이 없어서 var로 변환된 것을 볼 수 있다
// -> TS의 class로 사용하게 되면, 더 간편하게 작성할 수 있다.
