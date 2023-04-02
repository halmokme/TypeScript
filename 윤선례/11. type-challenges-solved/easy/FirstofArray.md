[https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00014-easy-first/README.ko.md)

# First of Array

배열(튜플) `T`를 받아 첫 원소의 타입을 반환하는 제네릭 `First<T>`를 구현하세요.

예시:

```tsx
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

<br>

# 풀이

```tsx
type First<T extends any[]> = T extends [infer F, ...any[]] ? F : never;
```

배열(튜플)을 T 타입 형태로 받아서

T 타입이 [infer F, ...any[]]와 일치하는지 확인,

일치한다면 첫 원소를 infer F로 가져오고, 일치하지 않는다면 never를 반환한다

이렇게 되면 First 타입은 입력된 배열(튜플)의 첫번째 원소 F의 타입과 동일하게 된다
