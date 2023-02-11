// 다형성 활용하기
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };
  // hasMilk와 hasSugar는 옵셔널

  class CoffeeMachine implements CoffeeMaker {
    static BEANS_GRAM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    // 상속받는 자식도 생성자를 써야하므로 constructor를 public 또는 protected로 변경
    constructor(beans: number) {
      this.coffeeBeans = beans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("커피콩의 양은 0보다 커야 합니다.");
      }
      this.coffeeBeans += beans;
    }

    grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("커피콩의 양이 충분하지 않습니다!");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }

    preheat(): void {
      console.log(`데우는 중...🧚‍♀️`);
    }

    extract(shots: number): CoffeeCup {
      console.log(`${shots}샷의 커피를 내리고 있습니다... ☕️`);
      return {
        shots,
        hasMilk: false,
      };
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    clean() {
      console.log(`기계를 청소 중입니다...🧼`);
    }
  }

  // 자식 클래스에서 부모 클래스를 덮어씌울 수 있음 (Overriding)
  // 공통적인 기능은 재사용하고, 자식 클래스에서 기능을 추가할 수 있음
  // super 키워드로 부모 클래스에 있는 함수들을 호출/접근할 수 있다
  class CafeLatteMachine extends CoffeeMachine {
    private addMilk(): void {
      console.log("우유를 추가하는 중...🥛");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.addMilk();
      return { ...coffee, hasMilk: true };
    }
    // 자식 클래스에서 생성자를 구현하는 경우, 부모 생성자를 호출해야 하고 -> super()
    // 부모 클래스에서 필요한 데이터도 받아와야 하고 (beans) 이것을 super로 전달해야 함
    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
      this.coffeeBeans = beans;
    }
  }

  // 다형성을 활용해 설탕이 들어가는 커피 머신 만들기
  // 한 가지의 인터페이스나 한 가지의 클래스를 이용해 다른 방식으로 구현한 클래스를 만들 수 있다
  class SweetCoffeeMaker extends CoffeeMachine {
    private addSugar(): void {
      console.log("설탕 가루를 뿌리는 중... 👩‍🍳");
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      this.addSugar();
      return { ...coffee, hasSugar: true };
    }
    constructor(beans: number) {
      super(beans);
      this.coffeeBeans = beans;
    }
  }

  // const latteMachine = new CafeLatteMachine(20, "SSSS");
  // console.log(latteMachine);
  // const coffee = latteMachine.makeCoffee(1);
  // console.log(coffee);
  const sweetMachine = new SweetCoffeeMaker(30);
  console.log(sweetMachine);
  const sweetCoffee = sweetMachine.makeCoffee(2);
  console.log(sweetCoffee);

  // 배열에 있는 모든 커피 머신을 돌면서 커피를 만듦
  // 내부적으로 구현된 다양한 클래스들이 한 가지 인터페이스를 구현하거나
  // 동일한 부모 클래스 상속시 동일한 함수를 어떤 클래스인지 구분하지 않고 공통된 API를 호출할 수 있다는 장점이 있다
  const machines: CoffeeMaker[] = [
    // CoffeeMaker 인터페이스의 배열로 만들 수 있음
    new CoffeeMachine(16),
    new CafeLatteMachine(16, "SSS"),
    new SweetCoffeeMaker(16),
    new CoffeeMachine(16),
    new CafeLatteMachine(16, "SSS"),
    new SweetCoffeeMaker(16),
  ];
  machines.forEach((machine) => {
    console.log("----------------------");
    machine.makeCoffee(1);
    // CoffeeMaker 인터페이스의 배열로 만들었으므로 인터페이스에 규약된 makeCoffee 함수 하나만 사용할 수 있다
  });
  // 다형성은 하나의 인터페이스나 부모의 클래스를 상속한 자식 클래스들이
  // 인터페이스와 부모 클래스에 있는 함수들을 다른 방식으로 다양하게 구성함으로서, 다양성을 만들어 볼 수 있는 것을 뜻함

  // 이처럼 인터페이스와 부모 클래스에 있는 동일한 함수 API를 통해
  // 각각의 구현된 자식 클래스의 내부 구현 사항을 신경쓰지 않고 약속된 한 가지 API를 호출
  // -> 사용자도 간편하게 기능 이용 가능

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
}
