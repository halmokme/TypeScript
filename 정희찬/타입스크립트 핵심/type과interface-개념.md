### Interfae 란?

- 어떤것의 규격 사항
- 다른사람들과 의사소통 할때 정해진 interface를 통해 상호작용을 하게 할 수 있다.
- **해당 규격을 통해서 구현**된다면 interface를 쓰는것이 좋다.
  - type으로 정의할 수도 있지만 interface를 사용하는 편이 좋다.

```tsx
// type으로 정의할 수 있지만 이를 통해 구현을 한다면 interface가 더 좋다
// type CoffeeMaker {
interface CoffeeMaker {
  coffeeBeans: number;
  makeCoffee: (shots: number) => Coffee;
}

class CoffeeMachine implements CoffeeMaker {
  coffeeBeans: number;
  makeCoffee(shots: number) {
    return {};
  }
}
```

### Type 이란?

- 어떠한 데이터를 담을 경우 데이터의 타입을 정할 때 사용한다.
- 구현할 목적이 아닌 데이터를 담을 목적이라면 type을 사용하는게 더 좋다.
  - 타입스크립트 초창기에는 type이 할 수 있는 일이 없어서 interface를 사용했었다.

```tsx
// type을 사용하는 것이 더 정확하다.
// interface Position{
type Position = {
  x: number;
  y: number;
};

const pos: Position = { x: 0, y: 0 };
printPosition(pos);
```

- 팀이나 환경에 따라서 사용하는 방식이 다를 수는 있다.
