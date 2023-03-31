[https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00004-easy-pick/README.ko.md)

# Pick

`T`에서 `K` 프로퍼티만 선택해 새로운 오브젝트 타입을 만드는 내장 제네릭 `Pick<T, K>`을 이를 사용하지 않고 구현하세요.

예시:

```tsx
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

# 풀이

내장 제네릭 Pick<T, K>를 사용하지 않고 구현하려면, keyof를 사용해 원하는 키 값을 가져오고, extends로 프로퍼티에 속한 값을 가져오는 방법을 활용할 수 있다.

```tsx
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

`<T, K extends keyof T>`

T 타입, T의 프로퍼티 중 K에 속한 키 값만을 가져와서 새로운 객체를 만든다

**keyof** T: T 타입에서 가능한 모든 프로퍼티 **키**를 가져올 수 있**다**

`[P in K]`

K에 속한 키를 각각의 키 값인 P로 하나씩 순회하고 새로운 객체 타입의 키로 사용한다

`: T[P]`

: T 타입에서 프로퍼티 키 P에 해당하는 값의 타입. 인덱스 타입을 활용한 것, 객체의 특정 프로퍼티 값을 가져올 수 있다.
