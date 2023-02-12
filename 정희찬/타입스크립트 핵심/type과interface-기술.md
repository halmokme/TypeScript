- 모든 곳에 iterface를 사용하는 것은 좋지 않다.
- 인터페이스로 사용하는곳과 Type Alias를 사용하는 곳을 생각해봐야한다.

- 공통적으로 사용 가능한 곳
  - object
  - class
  - Extends - 확장

```tsx
{
  type PositionType = {
    x: number;
    y: number;
  };

  interface PositionInterface {
    x: number;
    y: number;
  }

  // Type Alias와 interface 둘다 가능한 경우
  // object
  const obj1: PositionType = {
    x: 1,
    y: 1,
  };

  const obj2: PositionInterface = {
    x: 1,
    y: 1,
  };

  // class
  class Pos1 implements PositionType {
    x: number;
    y: number;
  }
  class Pos2 implements PositionInterface {
    x: number;
    y: number;
  }

  // 확장이 가능하다.
  // Extends - 확장 가능
  interface ZpositionInterface extends PositionInterface {
    z: number;
  }
  // intersection(&) 사용하여 확장 가능
  type ZpositionType = PositionType & { z: number };
}
```

- **interface 만 가능한 것**
  - 같은 이름으로 interface 를 만들 경우 merge가 된다.

```tsx
{
  type PositionType = {
    x: number;
    y: number;
  };

  interface PositionInterface {
    x: number;
    y: number;
  }

  const obj2: PositionInterface = {
    x: 1,
    y: 1,
    z: 1,
  };

  // class
  class Pos2 implements PositionInterface {
    x: number;
    y: number;
    z: number;
  }

  // 확장이 가능하다.
  // Extends - 확장 가능
  interface ZpositionInterface extends PositionInterface {
    z: number;
  }

  // 인터페이스는 merge가 가능하다.
  interface PositionInterface {
    z: number;
  }

  // error 발생 - 중복으로 인한 오류가 생긴다.
  type PositionType = {
    z: number;
  };
}
```

- **Type Alias 에서만 가능한 것**

```tsx
type Person = {
  name: string;
  age: number;
};

// type Person에서 name의 타입을 가져다 쓸 수 있음.
type Name = Person["name"]; // string 타입

type NumberType = number; // interface 에서는 사용 할 수 없음
type Direction = "left" | "right"; // interface 에서는 사용 할 수 없음
```
