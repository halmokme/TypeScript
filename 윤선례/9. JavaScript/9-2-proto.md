# Prototype

프로토타입은 모든 오브젝트가 Object를 상속한다는 것을 의미하며, 이를 이용하여 상속 구현이 가능하다.
CoffeeMachine과 LatteMachine 예제를 통해 프로토타입을 이용한 상속 구현 방법을 알아보자.

```jsx
const a = {};
const b = {};

console.log(a);
// {} 안에 [[Prototype]]: Object,
// 그 안에 __proto__ ,
// 다시 그 안에 Object가 있는 형태
// 즉, js에서 모든 오브젝트는 Object라는 프로토를 상속한다.

console.log(b);
```

**proto** 를 열면 Object 안에서 쓸 수 있는 기본적인 함수들(toString(), toLocaleString() … )이 있음

 <br>

```tsx
console.log(a.__proto__ === b.__proto__);
// true
```

a.**proto** === b.**proto**를 비교했을 때 true 출력

즉, a와 b는 동일한 Object의 proto를 상속함

<br>

```jsx
const array = [];
// [] 안에 Array라는 __proto__
// __proto__ 안에 Object가 있는 형태

console.log(array.push(1));
// array에도, Array라는 proto를 가지고 있음
// array -> Array -> Object 순으로 상속함
```

**proto** Array가 있고, Array 안에서 쓸 수 있는 기본적인 함수들 (length, every(), pop(), push(), concat(), fill() ..)이 있음

<br>

array 안에 Array가 있고, 그 프로토는 Object를 상속함

JS의 모든 오브젝트들은 Object를 상속한다

어떠한 종류의 오브젝트이건 상관없이 toString()을 사용할 수 있는 것도 다 Object 프로토를 가지고 있기 때문.

<br>

# 프로토타입을 이용한 상속 구현

타입스크립트의 클래스 같은 개념을 프로토타입으로 구현하기

```jsx
function CoffeeMachine(beans) {
  this.beans = beans;
  // 인스턴스 멤버 레벨
  this.makeCoffee = (shots) => {
    console.log("만드는 중... ☕️");
  };
}
```

CoffeeMachine은 constructor function, 대문자로 시작한다.

CoffeeMachine(beans)에서 beans를 받아오는데, 이 (beans)는 생성자와 비슷한 역할을 한다.

`this.beans = beans`

this.beans는 전달받은 beans로 설정함

```jsx
function CoffeeMachine(beans) {
  this.beans = beans;
  // 인스턴스 멤버 레벨
  this.makeCoffee = (shots) => {
    console.log("만드는 중... ☕️");
  };
}

const machine1 = new CoffeeMachine(10);
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);
// machine -> CoffeeMachine -> Object 순으로 상속함
```

이제 생성자 함수로 beans 수를 전달한 뒤 출력하면,

```tsx
// console.log를 출력하면..
CoffeeMachine {beans: 10, makeCoffee: ƒ}
beans: 10
makeCoffee: (shots) => { console.log("만드는 중... ☕️"); }
[[Prototype]]: Object

CoffeeMachine {beans: 20, makeCoffee: ƒ}
beans: 20
makeCoffee: (shots) => { console.log("만드는 중... ☕️"); }
[[Prototype]]: Object
```

기본적으로 Object를 상속하고 있음을 알 수 있다. 공통적으로 beans라는 프로퍼티가 들어있다.

이렇게 constructor function 안에 함수를 만들면, 만들어지는 오브젝트마다 공통된 함수를 가지게 된다.

그래서 만들어지는 인스턴스 마다 포함되므로, Instance member level이라고 함

<br>

# makeCoffee를 한 번만 정의하고 싶다면?

앞에서 본 object proto와 array proto에 정의되어져 있는 함수가 있었고

만들어진 오브젝트는 정의된 Prototype에 있는 것을 사용한 것처럼 동일한 행동을 할 수 있다. 아래와 같이 작성

```jsx
// 프로토타입 멤버 레벨
CoffeeMachine.prototype.makeCoffee = (shots) => {
  console.log("만드는 중... ☕️");
};
```

이제 다시 콘솔 로그를 확인해보면,

```tsx
CoffeeMachine {beans: 10}
beans: 10
[[Prototype]]: Object
// machine -> CoffeeMachine -> Object 순으로 상속함
```

CoffeeMachine은 proto를 가지고 있고, 이 proto는 Object이다.

그 안에 makeCoffee를 가지고 있고, Object를 상속한다.

즉, machine은 CoffeeMachine proto를 상속하고,

CoffeeMachine은 Object를 상속한다

<br>

# constructor function을 다시 상속받아 내부 함수 사용하기

```jsx
// 우유를 받아오는 LatteMachine
function LatteMachine(milk) {
  this.milk = milk;
}

// 타입을 정의하지 않고 아무거나 전달해도 되는 JS. 그래서 TS를 사용하는 것이 좋다
const latteMachine = new LatteMachine(123);

console.log(latteMachine);
// 로그 :
// LatteMachine {milk: 123}
// milk: 123
// [[Prototype]]: Object
```

Prototype을 열어보면, LatteMachine에서 정의한 constructor를 확인할 수 있음

결국 LatteMachine의 proto도 Object를 상속한다.

앞에서 만든 CoffeeMachine을 상속받아 makeCoffee를 사용해보자

`LatteMachine.prototype = Object.create(CoffeeMachine.prototype);`

create를 사용하면 CoffeeMachine의 prototype을 연결할 수 있다

이제 latteMachine을 확인 해보면,

LatteMachine은 CoffeeMachine을 상속하고,

CoffeeMachine은 Object를 상속하는 것을 확인할 수 있다

`latteMachine.makeCoffee()`

latteMachine에서 makeCoffee를 바로 사용할 수 있게 된다

<br>

# 결론 : JS는 Prototype으로 상속 구현 가능

js는 ts처럼 interface나 generic 같은 것을 사용할 순 없지만 **prototype을 이용해 상속을 구현할 수 있다**

**프로토타입은?** 자바스크립트에서 **객체 지향 프로그래밍, 즉 상속을 할 수 있고**, **코드를 재사용** 하기 위해 만들어졌다.

타입스크립트 플레이그라운드에서 확인 했을 때, 클래스로 작성하고 Target을 ES5로 바꾸면

상속이 prototype으로 만들어져 있고, let이 없어서 var로 변환된 것을 볼 수 있다

→ TS의 class로 사용하게 되면, 더 간편하게 작성할 수 있다.

<br>

# 전체 코드

```jsx
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

// 타입스크립트 플레이그라운드에서 확인 시 클래스로 작성하고 Target을 ES5로 바꾸면 상속이 prototype으로 만들어져 있고, let이 없어서 var로 변환된 것을 볼 수 있다
// TS의 class로 사용하게 되면, 더 간편하게 작성할 수 있는 것을 확인할 수 있다.
```
