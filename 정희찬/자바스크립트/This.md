**자바스크립트에서의 This 란?**

- 다른 프로그램에서의 This 랑은 차이가 있다.
- 자바스크립트에서의 This는 호출한 문맥에 따라서 동적으로 변경된다.
- 다른 객체지향 프로그래밍에서의 This란 Class 자신을 가리킨다.

```jsx
class Car {
  engine: number;

  mive() {
    this.engine++; // 여기서 this 는 Class Car를 가리킴.
  }
}
```

### 예제 1 - this를 console.log 로 찍어봤을 경우

- 자바스크립트의 this는 호출되는 곳의 문맥을 나타낸다.
  - 브라우저 상에서는 window가 글로벌 객체이기 때문에 window가 호출된다.

```jsx
// 브라우저 상에서의 this
console.log(this);
```

```tsx
// 위 함수 출력값
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

```tsx
function simpleFunc() {
  console.log(this);
}

// 아래 두 코드 모두 window 객체를 호출하게 된다.
window.simpleFunc();
simpleFunc();
```

```tsx
// 위 함수 출력값
// window.simpleFunc();
Window {window: Window, self: Window, document: document, name: '', location: Location, …}

// simpleFunc();
Window {window: Window, self: Window, document: document, name: '', location: Location, …}
```

### 예제 2

- 클래스 안에서의 this 호출

```tsx
class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  };
}

const counter = new Counter();
counter.increase();
```

```tsx
// 위 함수 출력값
Counter {count: 0, increase: ƒ}
```

**아래와 같이 되는 이유**

```tsx
// this의 정보를 잃어버림.
// const 로 정의한 변수는 window에 정의 되어있지 않다.
const caller = counter.increase;
caller(); // undefined를 출력함.
```

- const나 let으로 변수를 정의하면 window 객체를 통해 선언되지 않는다.
  ⇒ window에 등록되지 않음.
  ⇒ 예외로 var는 호출이 가능하다. - 호이스팅의 문제로 호출이됨. var의 사용은 자제하는게 좋다.
- 함수를 선언하면 기본적으로 window 객체에 선언이 된다.
  ⇒ 함수는 기본적으로 글로벌 객체(window)에서 사용이 가능하다.

```tsx
/* 개발자 도구에서 실행 */
function helloWold() {
  console.log("hello");
}

window.helloWorld; // hello 출력

const name = "heechan"; // window.name 으로 호출할 수 없다.
name; // "heechan" 출력됨.

let one = "1"; // window.name 으로 호출할 수 없다.
one; // "1" 출력됨.

var two = "2"; // window.two 로 호출할 수 있다.
window.two; // "2" 출력됨.
```

**다른 클래스를 할당할 경우**

- Bob 자체의 클래스가 출력된다.
- 자바스크립트에서는 this라는 정보를 다른 함수에 할당 하는 순간 this의 정보가 잃어버린다.

```tsx
class Counter {
  count = 0;
  increase = function () {
    console.log(this);
  };
}

class Bob {}
const bob = new Bob();
bob.run = counter.increase;
bob.run();
```

```tsx
// 위 함수의 출력값
Bob {run: ƒ}
```

**위 함수에서는 다른 함수에 this가 있음에도 다른 함수에 할당할 경우 값이 바뀌게 된다.**

⇒ this의 정보를 잃어버리지 않으려면 bind를 통해 this를 묶어줘야 한다.

```tsx
// this의 정보를 잃어버림.
const caller = counter.increase;
caller(); // undefined를 출력함.
```

```tsx
// 각자 바인딩하는 방법
const caller = counter.increase.bind(counter); // counter 오브젝트와 바인딩을 한다.
caller(); // Counter {count: 0, increase: ƒ} 를 출력한다.
```

**위 방법 또는 Arrow function을 사용해준다.**

⇒ 바인딩을 따로 해줄 필요가 없다.

⇒ 다른 프로그래밍 언어처럼 Arrow function의 경우 this가 선언된 당시의 스코프(문맥)을 유지할 수있다.

```tsx
class Counter {
  count = 0;
  increase = () => {
    // 여기에서의 this 는 Counter를 가리킨다.
    console.log(this);
  };
}

const counter = new Counter();
counter.increase();

const caller = counter.increase;
~~~~(
  // const caller = counter.increase.bind(counter); // counter 오브젝트와 바인딩을 한다.
  caller()
); // undefined를 출력함.
```
