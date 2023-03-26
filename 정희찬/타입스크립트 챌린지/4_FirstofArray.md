문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.md">First of Array</a>

#### 배열(튜플) `T`를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

**문제:**

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

**정답:**

```ts
// 2가지 방법.
// A1
type First<T extends any[]> = T[0] extends T[number] ? T[0] : never;
// A2
type First<T extends any[]> = T extends [] ? never : T[0];
```

---

**해설**
####A1
**T[0] extends T[number] ? T[0] : never;**

- `T[0]`가 `T[number]`에 할당 가능한지 체크
- 할당이 가능하면 `T[0]`를 반환, 그렇지 않으면 `never`타입을 반환한다.

####A2
**T extends [] ? never : T[0];**

- `T`가 빈배열`[]`인지 체크
- 빈 배열일 경우 `never` 타입을 반환하고 아니면 `T[0]`를 반환한다.
