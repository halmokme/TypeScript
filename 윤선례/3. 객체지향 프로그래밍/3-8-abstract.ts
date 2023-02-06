// 3-6 상속에서의 abstract 클래스 활용하기
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // class 앞에 abstract를 붙여서 사용 CoffeeMachine 자체로는 오브젝트를 만들 수 없게 됨 (추상적인 클래스)
  // 공통적인 기능들을 구현할 수 있고 구현하는 클래스마다 달라져야 하는 내용이 있다면 그 부분만 abstract 메소드로 정의 가능
  // abstract 클래스를 상속하면서 해당 클래스를 구현하지 않으면 에러 출력
  // -> 의도한 대로 공통적인 기능들 수행, 달라져야 하는 기능들만 상속하는 클래스에 구현해야 한다고 강조 가능
  // -> 상속을 써야할 때도 있지만, 상속과 composition을 이용해 깊은 수직 관계를 피하는 방법을 이용하는 것이 좋음

  // 부모 클래스 (abstract)로서 필요한 것을 정의,
  // 자식 클래스마다 달라질 수 있는 행동이 있다면 해당 행동의 함수 앞에 abstract 키워드를 붙임
  abstract class CoffeeMachine implements CoffeeMaker {
    static BEANS_GRAM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    constructor(beans: number) {
      this.coffeeBeans = beans;
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

    // abstract 클래스는 자식 클래스마다 다르게 구현 -> protected abstract 사용
    protected abstract extract(shots: number): CoffeeCup;
    // 추상적이므로 아래 구현 사항은 작성하지 않는다
    // {
    //   console.log(`${shots}샷의 커피를 내리고 있습니다... ☕️`);
    //   return {
    //     shots,
    //     hasMilk: false,
    //   };
    // }

    makeCoffee(shots: number): CoffeeCup {
      this.grindBeans(shots);
      this.preheat();
      return this.extract(shots);
    }

    clean() {
      console.log(`기계를 청소 중입니다...🧼`);
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    private addMilk(): void {
      console.log("우유를 추가하는 중...🥛");
    }
    // makeCoffee(shots: number): CoffeeCup {
    //   // 자식 클래스에서 부모의 makeCoffee를 super로 호출하지 않고, 커피를 만든다면?
    //   // (삭제) const coffee = super.makeCoffee(shots);
    //   this.addMilk();
    //   return { shots, hasMilk: true };
    // }
    // 부모 클래스에서 grindBeans, preheat 등의 과정을 놓칠 수 있음
    // 이것을 안전하게 작성하려면 abstract 클래스 필요

    // makeCoffee 함수를 오버라이딩 할 필요 없이, 아래처럼 작성
    protected extract(shots: number): CoffeeCup {
      this.addMilk();
      return {
        shots,
        hasMilk: true,
      };
    }

    constructor(beans: number, public readonly serialNumber: string) {
      super(beans);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // super 없이 추상 메소드만 구현하면 됨
    protected extract(shots: number): CoffeeCup {
      return {
        shots,
        hasSugar: true,
        hasMilk: true,
      };
    }
  }

  const sweetMachine = new SweetCoffeeMaker(30);
  console.log(sweetMachine);
  const sweetCoffee = sweetMachine.makeCoffee(2);
  console.log(sweetCoffee);

  const machines: CoffeeMaker[] = [
    // CoffeeMachine은 추상 클래스이므로 이것을 구현한 클래스만 만들 수 있음
    // (사용 불가) new CoffeeMachine(16),
    new CafeLatteMachine(16, "SSS"),
    new SweetCoffeeMaker(16),
    new CafeLatteMachine(16, "SSS"),
    new SweetCoffeeMaker(16),
  ];
  machines.forEach((machine) => {
    console.log("----------------------");
    machine.makeCoffee(1);
  });
}
