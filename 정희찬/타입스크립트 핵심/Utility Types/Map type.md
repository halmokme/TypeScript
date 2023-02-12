**기존에 있는 타입들을 이용하면서 조금 다른 형태로 변환할 수 있는 타입방식이다.**

- 반복되는 타입선언을 줄일 수 있다.
- 재사용성이 증가한다.

**맵 타입 선언 전**

- 반복적인 코드가 많이 사용된다.

```tsx
{
  type Video = {
    title: string;
    author: string;
  };

  // 비슷한 타입을 계속 선언하게 될 수 있다.
  type VideoOptional = {
    title?: string; // ?. 있어도 되고 없어도 될 경우
    author?: string; // ?. 있어도 되고 없어도 될 경우
  };
}
```

**맵 타입 선언 후**

- type Optional<T> = {
  [P in keyof T]?: T[P]; // for...in 메서드와 같음.
  };

```tsx
type Optional<T> = {
  // [...]으로 for...in 처럼 사용할 수 있다.
  // 아래 코드는 모든 타입에 ?. 을 적용시킨다.
  [P in keyof T]?: T[P]; // for...in 메서드와 같음.
};

// Optional 로 만든 타입
type VideoOptional = Optional<Video>;

// 다른 타입을 넣게되면 오류 발생. - Video 타입을 받아서 사용할 수 있다.
const videoOp: VideoOptional = {
  title: "hi",
  // animal: <- 이런식으로 다른 타입 넣으면 오류
};

type Animal = {
  name: string;
  age: number;
};

// union으로 합치기 가능.
const animal: Optional<Animal | Video> = {
  name: "dog",
};
```

- readonly 를 적용시킨 예

```tsx
// readonly를 적용시킨 map타입
type ReadOnly<T> = {
  readonly [P in keyof T]: T[P];
};

const animal: Optional<Animal> = {
  name: "dog",
};
animal.name = "cat"; // 변경 가능
console.log(animal.name); // cat 출력

const video: ReadOnly<Video> = {
  title: "hi",
  author: "heechan",
};
video.title = "good"; // error 발생한다. ReadOnly 형태로 할당했기 때문.
```

- null 타입이 가능한 예

```tsx
// 기존 타입 또는 null 타입이 가능한 map
type Nullable<T> = { [P in keyof T]: T[P] | null };

const obj2: Nullable<Video> = {
  title: "hi",
  author: null,
};
```

- 다른 예시 - map을 통해서 타입을 다른 타입으로 바꿀 수 있다.

```tsx
type Proxy<T> = {
  get(): T;
  set(value: T): void;
};

type Proxify<T> = {
  [P in keyof T]: Proxy<T[P]>;
};
```
