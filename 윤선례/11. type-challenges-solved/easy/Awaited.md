[https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.ko.md](https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.ko.md)

# Awaited

Promise와 같은 타입에 감싸인 타입이 있을 때, 안에 감싸인 타입이 무엇인지 어떻게 알 수 있을까요?

예시:  `Promise<ExampleType>`이 들어있을 때, `ExampleType`을 어떻게 얻을 수 있을까요?

```tsx
type ExampleType = Promise<string>;

type Result = MyAwaited<ExampleType>; // string
```

<br>

# 풀이

반환되는 값의 타입을 추론하기 위해 Awaited<R>를 사용한다

**`Awaited<R>`** 는 R이라는 프로미스(Promise)를 반환하는 함수나 메서드에서 해당 **프로미스가 처리된 후에 반환되는 값의 타입을 추론**하기 위해 사용한다

```tsx
type MyAwaited<T extends PromiseLike<any>> = T extends PromiseLike<infer R>
  ? Awaited<R>
  : T;
```

MyAwaited 제네릭 타입은 프로미스 타입을 받아, **프로미스가 처리된 후 반환되는 값의 타입을 추론**한다

MyAwaited는 PromiseLike 제네릭 타입에 할당되는 T 타입이다.

`infer` 키워드를 사용해서 PromiseLike에 전달된 제네릭 타입의 실제 타입을 추론,

T가 PromiseLike<infer R> 타입으로 추론될 경우,

R타입을 Awaited 제네릭으로 감싸서 프로미스가 처리된 후 **반환되는 값의 타입을 추론**한다

T가 PromiseLike<infer R> 타입으로 추론되지 않을 경우,

즉 **프로미스가 아닌 다른 타입이 할당된 경우**, **T 타입 자체를 반환**한다
