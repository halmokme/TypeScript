## Conditional Type

- 조건이 만족하는 타입을 선택할 수 있다.

```tsx
{
  // 주어진 타입(T)이 문자열(string)을 상속한다면 boolean 타입 아니면 number 타입으로 결정한다.
  type Check<T> = T extends string ? boolean : number;

  type Type = Check<string>; // Type의 타입은 boolean 이다.

  type TypeName<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends boolean
    ? "boolean"
    : T extends undefined
    ? "undefined"
    : T extends Function
    ? "function"
    : "object";

  type T0 = TypeName<string>; // T0 의 타입은 'string'
  type T1 = TypeName<"a">; // T1 의 타입은 'string'
  type T2 = TypeName<() => void>; // T2 의 타입은 'function'
}
```
