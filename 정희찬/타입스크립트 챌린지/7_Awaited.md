문제 페이지 : <a href="https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.ko.md">Awaited</a>

#### Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

**문제:** `Promise<ExampleType>`이 있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

```ts
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

**정답:**

```ts
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? Awaited<R>
  : T;
```

---

**해설**
**PromiseLike<infer R>**

- `PromiseLike`는 `Promise`와 유사한 인터페이스를 가진 객체이다.
- `PromiseLike` 타입에 할당 가능한 경우는 `Promise` 타입이거나 `Promise`와 유사한 객체라는 의미이다.

**Awaited<R>**

- R 타입이 `Promise`로 감싸져 있을 경우 `Promise`에서 값을 추출하고 그렇지 않으면 그대로 반환한다.
- `await` 키워드를 사용하는 비동기 함수에서 `Promise`의 값을 추출할 때 사용한다.
