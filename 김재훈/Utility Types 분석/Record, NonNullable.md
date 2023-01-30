
### 개념

```
// Record는 객체를 표현하는 하나의 방법
const a: Record<string, number> = { a: 3, b: 5, c: 7 };

// 위 코드는 아래와 같다
interface Obj {
    [key: string]: number;
}
const a: Obj = { a: 3, b: 5, c: 7 };


// null, undefined는 빼고 가져오고 싶을 때 NonNullable
type A = string | number | boolean | undefined | null
type B = NonNullable<A>;     // string | number | boolean

```



### 분석

#### Record
```
// 객체의 키는 string, number, symbol만 올수있어서 그 제한조건을 붙이기 위해 any를 준거임
type R<T extends keyof any, S> = {
    [Key in T]: S
}

const a: R<string, number> = { a: 3, b: 5, c: 7 };

```

#### NonNullable
```
type N<T> = T extends null | undefined ? never : T;
```
