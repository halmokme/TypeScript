문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00018-easy-tuple-length/README.ko.md">Length of Tuple</a>

#### 배열(튜플)을 받아 길이를 반환하는 제네릭 Length<T>를 구현하세요.

**문제:**

```ts
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

**정답:**

```ts
type Length<T extends readonly any[]> = T["length"];
```

---

**해설**
**T["length"]**

- T["length"] 에서 'length' 키워드를 사용해서 길이를 알 수 있다.
