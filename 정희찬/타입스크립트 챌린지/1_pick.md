문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.md">Pick</a>

#### `T`에서 `K` 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

**문제:**

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

=> Todo 인터페이스에서 "title" 과 "completed" 의 타입만을 사용한다.

**정답:**

```ts
type MyPick<T, K extends keyof T> = {
  [key in K]: T[key];
};
```

---

**해설**

**<T, K extends keyof T>**

- **타입 T** 와 **타입 K** 두가지 타입을 인자로 받는다.
- **K extends keyof T :** K는 T 객체의 키(key) 중 하나를 선택할 수 있는 타입.

```ts
// key : title, description, completed
// value : string, string, boolean
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
```

**[key in K]: T[key]**

- **[key in K] :** key는 K에 정의된 키(Key) 들 중 하나이다.
  => for...in 과 같이 동작한다.
- **T[key] :** T 객체에서 key에 해당하는 값(value)을 의미한다
