문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.ko.md">Exclude</a>

#### T에서 U에 할당할 수 있는 타입을 제외하는 내장 제네릭 Exclude<T, U>를 이를 사용하지 않고 구현하세요.

**문제:**

```ts
type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

**정답:**

```ts
type MyExclude<T, U> = T extends U ? never : T;
```

---

**해설**
**T extends U ? never : T**

- T의 타입들에서 U와 같은 타입을 상속하지 않으면 T를 반환한다.
