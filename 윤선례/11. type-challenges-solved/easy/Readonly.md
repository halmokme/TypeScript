[https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.ko.md)

# Readonly

`T`의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

예시:

```tsx
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
```

# 풀이

T타입을 모든 순회하면서 readonly 속성으로 만든 새로운 타입을 정의한다.

객체의 모든 속성을 읽기 전용으로 만들 수 있다.

`[P in keyof T]`

T 객체의 모든 속성 이름을 문자열 리터럴 타입인 P로 가져온다

`readonly`

T 객체의 모든 속성 이름을 순회하면서 T[P]와 함께 P 속성을 readonly로 변경한다

```tsx
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```
