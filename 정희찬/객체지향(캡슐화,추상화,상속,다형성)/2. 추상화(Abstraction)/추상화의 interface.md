- interface를 다르게 지정하여 여러 방식으로 타입을 정할 수 있다.
- class에서 implements를 어떻게 하냐에 따라 정할 수 있는 interface가 다르다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 2가지의 interface를 작성
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // ------------- 추가 --------------
  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }
  // -------------------------------

  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
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

  //---------------------------------------------------
  class AmateurUser {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class ProBarista {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);

      this.machine.fillCoffeeBeans(45);
      this.machine.clean();
    }
  }

  // maker의 타입은 CoffeeMachine이 될 수 있다.
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(24);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);
  //   amateur.makeCoffee();
  pro.makeCoffee();
}
```

**amateur.makeCoffee() - 출력값**

> grinding beans for 2
> heating up...
> Pulling 2 shots...
> { shots: 2, hasMilk: false }

**pro.makeCoffee() - 출력값**

> grinding beans for 2
> heating up...
> Pulling 2 shots...
> { shots: 2, hasMilk: false }
> cleaning the machine...
