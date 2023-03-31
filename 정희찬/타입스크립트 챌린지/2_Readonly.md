문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00007-easy-readonly/README.ko.md">Readonly</a>

#### `T`의 모든 프로퍼티를 읽기 전용(재할당 불가)으로 바꾸는 내장 제네릭 `Readonly<T>`를 이를 사용하지 않고 구현하세요.

**문제:**

```ts
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

=> 인터페이스 안에 있는 타입들을 모두 readonly 타입으로 변경해야 한다.

**정답:**

```ts
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

---

**해설**

**readonly [P in keyof T]**

- **[P in keyof T] :** keyof T로 타입 T를 유니온 타입으로 변환 한 후 반복문을 돈다.
- **readonly :** readonly 키워드를 사용해서 모든 프로퍼티를 읽기전용으로 바꾼다.

```ts
// 아래와 같은 모습으로 변경됨.
interface a {
  readonly b: string;
}
```
