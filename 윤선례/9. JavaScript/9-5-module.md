# **모듈화**

모듈화는 타입을 module로 선언하고 export, import 키워드를 이용해 사용할 수 있다.

모듈화를 이용하면 기능과 데이터를 캡슐화 해 중복적으로 발생할 수 있는 충돌을 방지할 수 있으며, 유지 보수가 쉬워지고, 애플리케이션 성능이 향상된다.

<br>

모듈화 하지 않으면 기본적으로 글로벌 스코프로 측정된다

<br>
html 문서에서 9-5-module1.js와 9-5-module2.js을 연결한 뒤

```tsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script src="9-5-module1.js"></script>
    <script src="9-5-module2.js"></script>
  </body>
</html>
```

<br>

module1.js

```jsx
function add(a, b) {
  return a + b;
}
```

<br>

module2.js

```jsx
console.log(add(1, 2));
function add(a, b) {
  return a * b;
}
```

위처럼 각각의 곳에서 선언하게 된 경우 문제점 발생.

이렇게 각각의 곳에서 선언하면 **두 번 선언**하게 되고, **어디서 선언했는지 알 수 없게 됨**

<br>
<br>
<br>

# **모듈화 방법**

html에서 스크립트를 연결할 때 타입을 모듈로 설정한다

**html 파일**

```tsx
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <script type="module" src="9-5-module1.js"></script>
    <script type="module" src="9-5-module2.js"></script>
  </body>
</html>
```

<br>

module1.js

```jsx
function add(a, b) {
  return a + b;
}
```

<br>
module2.js

```tsx
console.log(add(1, 2));
```

모듈1 파일에만 함수가 정의되어 있고, 모듈2 파일에는 함수가 없는 상태로 출력하면

함수가 정의되어져 있지 않다는 에러가 출력됨

9-5-module2.js:1 Uncaught ReferenceError: add is not defined
at 9-5-module2.js:1:9

타입을 모듈로 작성하는 순간, 서로 접근할 수 없는 상태가 된다

<br>
<br>

# export

## **다른 파일에서 사용하려면 export 키워드를 사용**

**module1.js**

```tsx
export default function add(a, b) {
  return a + b;
}
// 이 모듈을 import하면 이 함수를 기본으로 export 한다
```

<br>

**module2.js**

```tsx
import sum from "./9-5-module1.js";
console.log(sum(1, 2));

// 이름을 자유롭게 받아올 수도 있다.
```

export default시 원하는 대로 이름을 정의해서 사용할 수 있다.

<br>
<br>

## **한 파일에서 두 개의 default를 사용할 수 없다**

```jsx
export default function add(a, b) {
  return a + b;
}

export default function print() {

}
// 29-5-module1.js:5 Uncaught SyntaxError: Duplicate export of 'default'
```

한 파일 안에서 default는 꼭 하나여야 하고,

나머지는 export 를 사용

가져올 때 default는 괄호 없이 사용 가능하지만,

**default 아닌 것은 괄호를 이용 + 동일한 이름으로 가져와야 함**

<br>

**module1.js**

```tsx
export default function add(a, b) {
  return a + b;
}

export function print(a, b) {
  return a * b;
}
```

<br>

**module2.js**

```tsx
import sum, { print } from "./9-5-module1.js";
console.log(sum(1, 2));
console.log(print(4, 5));

// 3
// 20
```

<br>
<br>
<br>

## **default 아닌 것을 동일한 이름이 아닌 다른 이름으로 가져와야 한다면**

as 키워드를 사용한다

```tsx
import sum, { print as printNumber } from "./9-5-module1.js";
console.log(sum(1, 2));
console.log(printNumber(4, 5));
```

<br>
<br>

## **모두 export로 내보낼 땐 [ * as 이름 ]**

**module1.js**

```tsx
export function add(a, b) {
  return a + b;
}

export function print(a, b) {
  return a * b;
}

// default가 없는 경우
```

```tsx
import * as calculator from "./9-5-module1.js";
console.log(calculator.add(1, 2));
console.log(calculator.print(4, 5));

// 위 형태로 가져온다
```

<br>
<br>

## **변수명도 export가 가능**

**module1.js**

```tsx
export function add(a, b) {
  return a + b;
}

export function print(a, b) {
  return a * b;
}

export const number = 17;
```

**module2.js**

```jsx
import * as calculator from "./9-5-module1.js";
console.log(calculator.add(1, 2));
console.log(calculator.print(4, 5));
console.log(calculator.number);

// 3
// 20
// 17
```

<br>
<br>
<br>

# **모듈화를 이용하면..**

- 기능과 데이터를 캡슐화, 파일들 간의 중복적으로 발생할 수 있는 이름 충돌 방지
- 모듈간의 재사용성 높임
- 유지 보수가 쉬워짐
- 서로간의 코드 분리 → 모듈성 높임
- 초기 로드 시간 줄이고 메모리 사용량을 줄여, 애플리케이션 성능 향상
