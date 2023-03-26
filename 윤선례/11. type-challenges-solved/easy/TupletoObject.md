[https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.ko.md)

# Tuple to Object

배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

예시:

```tsx
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

# 풀이

```tsx
type TupleToObject<T extends readonly any[]> = {
  [K in T[number]]: K;
};
```

`[K in T[number]]`

배열 T에 포함된 모든 요소들을 유니온 타입으로 갖고 있고, 각 타입 K를 키로 갖고 있다

`: K`

값으로 해당 타입 K를 가진다
