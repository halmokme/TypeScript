[https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.ko.md)

# Length of Tuple

배열(튜플)을 받아 길이를 반환하는 제네릭 `Length<T>`를 구현하세요.

예시:

```tsx
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

<br>

# 풀이

```tsx
type Length<T> = T extends { length: infer L } ? L : never;
```

`{length: infer L}`

배열의 내장 속성인 length를 활용, T 타입의 길이를 가져온다

infer L에서 L은 length 속성에서 추론된 타입을 가리키게 된다

추론된 L을 이용해서 배열의 길이를 반환하게 된다
