### 상속 전의 코드

- 코드의 재사용성이 떨어진다.
- 같은 코드가 반복되는 상태이다.
- 아래 두 클래스(CaffeLatteMachine, CoffeeMachine) 가 반복되는 코드가 많다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CaffeLatteMachine {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CaffeLatteMachine {
      return new CaffeLatteMachine(coffeeBeans);
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
      if (this.coffeeBeans < shots * CaffeLatteMachine.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CaffeLatteMachine.BEANS_GRAMM_PER_SHOT;
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

    //----- 살짝 다른 부분------
    // 우유를 추가함.
    makeCoffee(shots: number): CoffeeCup {
      // 커피 생성 과정
      this.grindBeans(shots); // 커피 갈기
      this.preheat(); // 미리 데우기
      const coffee = this.extract(shots);
      return { ...coffee, hasMilk: true }; // 커피 추출
    }
  }

  class CoffeeMachine implements CoffeeMaker {
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

    //----- 살짝 다른 부분------
    makeCoffee(shots: number): CoffeeCup {
      // 커피 생성 과정
      this.grindBeans(shots); // 커피 갈기
      this.preheat(); // 미리 데우기
      return this.extract(shots); // 커피 추출
    }
  }

  // maker의 타입은 CoffeeMachine이 될 수 있다.
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(24);
}
```

### 상속 하는 방법

- 상속 되는(부모) 클래스의 밑에 작성을 해야한다.
- extends 키워드를 사용
  - class CaffeLatteMachine extends CoffeeMachine
- constructor가 private 이면 상속이 불가능하다.
  - protected 또는 public을 사용한다.
  - protected : 상속하는 클래스에서 사용 가능하게 변경.
- 자식클래스에서 부모클래스에 있는 함수를 덮어씌울 수 있다.
  - overwriting
- super 키워드를 통해 부모클래스의 함수를 사용할 수 있다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

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

  // 상속한 클래스 정의
  class CaffeLatteMachine extends CoffeeMachine {
    // 자식 클래스에서 생성자를 만드는 경우
    // 부모 클래스에서 필요한 데이터도 받아와야한다.
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }

    // super 키워드를 사용하지 않고 출력한 경우
    // makeCoffee(shots: number): CoffeeCup {
    // return {
    //    shots,
    //    hasMilk: true,
    // };
    // }
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

  // maker의 타입은 CoffeeMachine이 될 수 있다.
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(24);
  const machine = new CoffeeMachine(23);
  const latteMachine = new CaffeLatteMachine(23);
  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee);
}
```

- super 사용하지 않은 상태의 출력

> { shots: 1, hasMilk: true }

super : 부모 클래스의 함수를 모두 이용하고 싶을 경우 사용.

- super 사용 할 경우

> grinding beans for 1
> heating up...
> Pulling 1 shots...
> 스팀밀크 생성
> { shots: 1, hasMilk: true }
