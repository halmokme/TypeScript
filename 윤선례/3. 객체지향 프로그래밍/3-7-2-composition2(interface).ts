// 상속의 단점을 보완할 수 있는 Composition 활용하기 2 + interface
// Composition은 클래스 간의 관계를 만들 때 사용할 수 있다
// 개체들 간에 종속 관계를 만드는 것이 가능하며, 개체들이 서로 관계를 가지면서도 각 개체들이 독립적으로 작동할 수 있게 함
// 필요한 기능을 외부에서 주입 받아서, 컴포지션을 이용해 필요한 기능만을 재사용 가능 (코드의 재사용성)
// 클래스 간 밀접하게 연결되어 있어서 업데이트에 제약이 있는 composition의 단점을 interface 활용으로 해결할 수 있다
// interface를 통해 객체 간의 관계를 정의하고, 객체 간의 관계를 강제하지 않아도 동작하는 코드를 작성할 수 있다
// 아래 예제 : MilkFrother와 SugarProvider 인터페이스를 이용해 각각의 머신에 필요한 요소만 추가할 수 있음
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

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

  // 우유 거품기 클래스 만들기
  class MilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("우유를 따뜻하게 데우는 중...🔥🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("우유를 엄청나고 고급스럽게 데우는 중...🔥🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("차가운 우유 거품을 내는 중...🧊🥛");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기 클래스 만들기
  class AutomaticSugarMixer implements SugarProvider {
    private getSugar() {
      console.log("별사탕으로부터 설탕을 가져오는 중...⭐️");
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class SugarMixer implements SugarProvider {
    private getSugar() {
      console.log("병에서 설탕을 꺼내오는 중...🍶");
      return true;
    }
    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSugar();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class CafeLatteMachine extends CoffeeMachine {
    // 이제 steamMilk 위에서 만든 클래스 사용으로, 중복적으로 작성할 필요 없어짐!
    // private steamMilk(): void {
    //   console.log("우유를 따뜻하게 데우는 중...🔥🥛");
    // }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // this.steamMilk();
      // return { ...coffee, hasMilk: true };
      return this.milkFrother.makeMilk(coffee);
    }
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: MilkFrother
    ) {
      super(beans);
      this.coffeeBeans = beans;
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // AutomaticSugarMixer 클래스 사용으로 중복으로 작성할 필요 없어짐!
    constructor(private beans: number, private sugar: SugarProvider) {
      super(beans);
    }
    // private addSugar(): void {
    //   console.log("설탕 가루를 뿌리는 중... 👩‍🍳");
    // }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      // this.addSugar();
      // return { ...coffee, hasSugar: true };
      return this.sugar.addSugar(coffee);
    }
  }

  // composition을 통해 레고 조립하듯 간단하게 필요한 것을 만들 수 있다
  class SweetCafeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdded = this.milk.makeMilk(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // Milk
  const cheapMilkMaker = new MilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  // Sugar
  const candySugar = new AutomaticSugarMixer();
  const sugar = new SugarMixer();

  //
  const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
  // (아래) 동일한 클래스를 이용하면서, 인자만 바꿀 뿐인데 다른 객체를 출력시킬 수 있음
  const sweetMachine = new SweetCoffeeMaker(12, sugar);

  const latteMachine = new CafeLatteMachine(12, "SSS", cheapMilkMaker);
  const coldLatteMachine = new CafeLatteMachine(12, "SSS", coldMilkMaker);
  const fancyLatteMachine = new CafeLatteMachine(12, "SSS", fancyMilkMaker);

  const sweetLatteMachine = new SweetCafeLatteMachine(
    12,
    cheapMilkMaker,
    candySugar
  );

  // 클래스간 서로 상호 작용하는 경우에 클래스 자신을 노출하는 것이 아니라 인터페이스에 의거한 의사소통을 해야 함
}
