// 상속 활용하기
// 커피 머신 클래스를 상속하는 다른 종류의 커피 머신 만들기. 클래스를 상속할 때는 extends 키워드 사용
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    // 상속받는 자식도 생성자를 써야하므로 constructor를 public 또는 protected로 변경
    protected constructor(beans: number) {
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

  const latteMachine = new CafeLatteMachine(20, "SSSS");
  console.log(latteMachine);
  const coffee = latteMachine.makeCoffee(1);
  console.log(coffee);

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
}
