[https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00043-easy-exclude/README.ko.md)

# Exclude

`T`에서 `U`에 할당할 수 있는 타입을 제외하는 내장 제네릭 `Exclude<T, U>`를 이를 사용하지 않고 구현하세요.

예시:

```tsx
type Result = MyExclude<"a" | "b" | "c", "a">; // 'b' | 'c'
```

<br>

# 풀이

```tsx
type MyExclude<T, U> = T extends U ? never : T;
```

MyExclude 제네릭 타입은 <T, U> 두 개의 제네릭 타입 매개변수를 받는다

T가 U에 할당이 가능하다면 아무것도 반환하지 않고,

할당이 불가능하다면 T 타입을 반환하게 된다.

따라서 `Exclude<T, U>`를 사용하면 U에 할당한 타입은 제외하고 반환하게 된다
