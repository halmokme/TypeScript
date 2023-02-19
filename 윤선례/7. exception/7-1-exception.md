# Error에 대해

Java: Exception
JavaScript: Error

```tsx
const array = new Array(100000000000000000);
// RangeError: Invalid array length 오류 출력 : 유효하지 않은 배열의 갯수를 사용
```

2. 기본타입 연습 폴더 - game.ts를 활용해 Error에 대해 배워보자.

```tsx
{
  const position = {
    x: 0,
    y: 0,
  };

  function move2(direction: "up" | "down" | "left" | "right" | "she") {
    switch (direction) {
      case "up":
        position.y += 1;
        break;
      case "down":
        position.y -= 1;
        break;
      case "left":
        position.x -= 1;
        break;
      case "right":
        position.x += 1;
        break;

      default:
        throw new Error(`unknown direction ${direction}`);
      // 케이스를 제대로 처리하지 않으면 에러 발생(개발자가 새로운 타입을 추가할 때, 케이스에서 핸들링 하지 않으면 에러)
      // 보통 컴파일 단계에서 실수하지 않도록, 경고를 만드는 것이 좋음
    }
  }

  console.log(position); // { x: 0, y: 0}
  move2("up");
  console.log(position); // { x: 0, y: 1}
  move2("down");
  console.log(position); // { x: 0, y: 0}
  move2("left");
  console.log(position); // { x: -1, y: 0}
  move2("right");
  console.log(position); // { x: 0, y: 0}
  move2("she");
  console.log(position); // { x: 0, y: 0}
}
```

### 컴파일 단계에서 경고 만들기

```tsx

      default:
        const invalid: never = direction;
        throw new Error(`unknown direction ${invalid}`);

```

**never 타입 : 절대 발생하지 않는 값을 나타내는 타입**

컴파일러가 타입 검사를 할 때 함수의 반환값이 never라면 그 함수 이후의 코드는 도달할 수 없다고 판단, 이를 활용해 코드의 타입 안정성을 높임

```tsx

      // 타입 string은 never 타입에 할당할 수 없다는 에러 출력. 이 때 case 'she'를 추가
      case "she":
        position.x += 1;
        break;
```

이제 컴파일 에러 발생하지 않음. 모든 케이스를 다 다뤘기 때문에, never는 never에 할당
컴파일 단계에서 코딩할 때 처리하지 않으면, 컴파일 에러 발생 -> 따로 에러가 발생하지 않음

### 완성된 코드

```tsx
// const array = new Array(100000000000000000);
// RangeError: Invalid array length 오류 출력 : 유효하지 않은 배열의 갯수를 사용

// 2. 기본타입 연습 폴더 - game.ts
{
  const position = {
    x: 0,
    y: 0,
  };

  function move2(direction: "up" | "down" | "left" | "right" | "she") {
    switch (direction) {
      case "up":
        position.y += 1;
        break;
      case "down":
        position.y -= 1;
        break;
      case "left":
        position.x -= 1;
        break;
      case "right":
        position.x += 1;
        break;

      // default:
      //   throw new Error(`unknown direction ${direction}`);
      // 케이스를 제대로 처리하지 않으면 에러 발생(개발자가 새로운 타입을 추가할 때, 케이스에서 핸들링 하지 않으면 에러)
      // 보통 컴파일 단계에서 실수하지 않도록, 경고를 만드는 것이 좋음

      // 타입 string은 never 타입에 할당할 수 없다 는 에러 출력. 이 때 case 'she'를 추가
      case "she":
        position.x += 1;
        break;
      // 이제 컴파일 에러 발생하지 않음. 모든 케이스를 다 다뤘기 때문에, never는 never에 할당
      // 컴파일 단계에서 코딩할 때 처리하지 않으면, 컴파일 에러 발생 -> 따로 에러가 발생하지 않음

      // never 타입 : 절대 발생하지 않는 값을 나타내는 타입
      // 컴파일러가 타입 검사를 할 때 함수의 반환값이 never라면 그 함수 이후의 코드는 도달할 수 없다고 판단, 이를 활용해 코드의 타입 안정성을 높임
      default:
        const invalid: never = direction;
        throw new Error(`unknown direction ${invalid}`);
    }
  }

  console.log(position); // { x: 0, y: 0}
  move2("up");
  console.log(position); // { x: 0, y: 1}
  move2("down");
  console.log(position); // { x: 0, y: 0}
  move2("left");
  console.log(position); // { x: -1, y: 0}
  move2("right");
  console.log(position); // { x: 0, y: 0}
  move2("she");
  console.log(position); // { x: 1, y: 0}
}
```
