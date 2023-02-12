### extends와 implements의 특징

**`extends`**및 **`implements`**키워드는 유형 간의 상속 관계를 지정하는 데 사용된다.

그러나 그들은 다른 맥락과 다른 목적으로 사용됩니다.

**`extends`**클래스 간의 상속 관계를 만드는 데 사용되는 반면 **`implements`**클래스가 인터페이스를 구현하도록 지정하는 데 사용됩니다.

### extends

- 클래스 간의 상속 관계를 만드는데 사용된다.

```tsx
class Animal {
  move(distanceInMeters: number = 0) {
    console.log(`Animal moved ${distanceInMeters}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof! Woof!");
  }
}
```

- 제네릭에서도 사용된다.
- 인터페이스를 상속하지만 extends 키워드를 사용하게 된다.
  - 제네릭에서 약속된 문법.

```tsx
interface Employee {
  pay(): void;
}

function pay<T extends Employee>(employee: T): T {
  // function pay<T>(employee: T): T {
  // employee.pay가 나타나지 않음. extends를 추가해야한다.
  employee.pay();
  return employee;
}
```

### implements

- 클래스가 인터페이스를 구현함을 지정하는 데 사용된다.
- 인터페이스는 이를 구현하는 클래스에 대한 계약을 정의하는 유형이다.
- **인터페이스를 구현하는 클래스는 해당 인터페이스에 정의된 모든 속성과 메서드를 포함**해야 한다.

```tsx
interface ICalculator {
  add(a: number, b: number): number;
}

class Calculator implements ICalculator {
  add(a: number, b: number): number {
    return a + b;
  }
}
```
