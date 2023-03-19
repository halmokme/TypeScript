# sourceMap을 활용한 디버깅

브라우저에서 다운로드해서 사용하고 있는것은 컴파일 된 js 코드

```tsx
// main.ts

"use strict";
class Car {
  engine = 0;
  move() {
    const engine = this.engine + 1;
    console.log("not number type engine");
    console.log(engine);
  }
}

const car = new Car();
car.move();
```

코드에 버그를 만들어서 디버깅 해보자.

<br>
<br>

# 코드에서 버그가 있었다면, 디버깅

Sources → build 폴더 → 해당 js 파일 선택

생성된 코드가 있는데 작성한 ts 파일은 없음.

디버깅을 위해 컴파일 된 코드를 보면서 유추하고 하나씩 디버깅 해야 하는데 이 과정은 번거롭고 이해하기 어렵다. 그래서 sourceMap을 사용.

<br>
<br>

# sourceMap

tsconfig 파일 내부에 sourceMap 옵션을 활성화 하면 .map이라는 파일을 생성한다

작성한 ts 코드와 컴파일된 js 코드를 연결 시켜주는 정보들이 담겨있고

이렇게 되면 js 파일마다 map 파일이 생긴다

해당 파일은 디버깅 툴(브라우저)에서 이해할 수 있다

이제 src가 포함되어지고, main.ts의 해당 코드 위에 break point를 줄 수 있어서, ts 파일에서 break point가 걸리는 것을 확인할 수 있다

<br>

**크롬브라우저 개발 툴 위에서 웬만한 단축키 사용 가능**

크롬브라우저 개발 툴에서 디버깅 하는 것이 편한 이유

1. 간편하며, 소스 확인이 가능
2. 실시간으로 요소 스타일링 확인 가능
3. 콘솔에서 여러가지 시험 가능

<br>

vscode에서 디버깅은 extension에서 debugger for chrome을 사용한다

vscode 안에서도 크롬과 연결해 디버깅이 가능한데 이 때 내 코드만 확인이 가능

그래서 DOM 요소나 CSS 스타일링까지 확인할 수 있는 **브라우저 개발 툴을 확인하는 것이 더 간편**하다
