### 다형성

- 하나의 클래스나 하나의 인터페이스로 여러가지 클래스를 만들 수 있다.

```tsx
{
  type CoffeeCup = {
    shots: number;

    //
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

	// -----------------------------------------------------------
  // CoffeeMachine -> CoffeeMaker 이고
  // CaffeLatteMachine -> CoffeeMachine를 상속했으므로
  // CaffeLatteMachine -> CoffeeMaker이다.
  // SweetCoffeeMaker 도 마찬가지.
  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    public constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    clean(): void {
      console.log(`cleaning the machine...`);
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAMM_PER_SHOT;
    }

    private preheat() {
      console.log(`heating up...`);
    }

    private extract(shots: number): CoffeeCup {
      console.log(`Pulling ${shots} shots...`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      // 커피 생성 과정
      this.grindBeans(shots); // 커피 갈기
      this.preheat(); // 미리 데우기
      return this.extract(shots); // 커피 추출
    }
  }

  class CaffeLatteMachine extends CoffeeMachine {
    // 자식 클래스에서 생성자를 만드는 경우
    // 부모 클래스에서 필요한 데이터도 받아와야한다.
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
    private steamMilk(): void {
      console.log("스팀밀크 생성");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.steamMilk();
      return {
        ...coffee,
        hasMilk: true,
      };
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    private sugar(): void {
      console.log("설탕 추가");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.sugar();
      return {
        ...coffee,
        hasSugar: true,
      };
    }
  }

 ... // 바뀌는 코드 위치
}
```

### 결과 값이 다른 3가지 경우 - 바뀌는 코드

```tsx
...
  const machines = [
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "1"),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CaffeLatteMachine(16, "2"),
    new SweetCoffeeMaker(16),
  ];

  machines.forEach((machine) => {
    console.log(`--------------------------`);
    machine.makeCoffee(1);
		// clean, fillCoffeeBeans, makeCoffee 3가지를 사용할 수 있다.
    machine.
  });
}
```

```tsx
...
  const machines:CoffeeMachine[] = [
		...
  ];

  machines.forEach((machine) => {
    console.log(`--------------------------`);
    machine.makeCoffee(1);
		// clean, fillCoffeeBeans, makeCoffee 3가지를 사용할 수 있다.
    machine.
  });
}
```

```tsx
...
  const machines:CoffeeMaker[] = [
		...
  ];

  machines.forEach((machine) => {
    console.log(`--------------------------`);
    machine.makeCoffee(1);
		// makeCoffee 1가지를 사용할 수 있다.
    machine.
  });
}
```
