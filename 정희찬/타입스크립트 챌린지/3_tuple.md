문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00011-easy-tuple-to-object/README.ko.md">Tuple</a>

#### 배열(튜플)을 받아, 각 원소의 값을 key/value로 갖는 오브젝트 타입을 반환하는 타입을 구현하세요.

**문제:**

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;

type result = TupleToObject<typeof tuple>; // expected { tesla: 'tesla', 'model 3': 'model 3', 'model X': 'model X', 'model Y': 'model Y'}
```

**정답:**

```ts
type TupleToObject<T extends readonly any[]> = {
  [key in T[number]]: key;
};
```

---

**해설**

**튜플이란?** : 길이와 타입이 고정된 배열을 의미한다.

**<T extends readonly any[]>**

- **readonly any[] :** 튜플의 성질을 유지하기 위해서 배열을 readonly 타입으로 고정시킨다.

**[key in T[number]]: key;**

- **T[number] :** T 타입의 인덱스(number)를 통해 원소에 모두 접근하는 방법이다.

```ts
const tuple = ["tesla", "model 3", "model X", "model Y"] as const;
type a = typeof tuple[number]; // a는 tuple의 모든 원소를 유니온 타입으로 가진다.
// type a = "tesla" | "model 3" | "model X" | "model Y"
```
