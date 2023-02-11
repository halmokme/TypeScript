// 상속의 단점을 보완할 수 있는 Composition 활용하기
// Composition은 클래스 간의 관계를 만들 때 사용할 수 있다
// 개체들 간에 종속 관계를 만드는 것이 가능하며, 개체들이 서로 관계를 가지면서도 각 개체들이 독립적으로 작동할 수 있게 함
// 필요한 기능을 외부에서 주입 받음으로서, 컴포지션을 이용해 필요한 기능만을 재사용 가능 (코드의 재사용성)
// 단점 : 클래스 간 밀접하게 연결되어 있어서 업데이트에 제약이 있음.
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

  // 우유 거품기 클래스 만들기
  class MilkSteamer {
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

  // 설탕 제조기 클래스 만들기
  class AutomaticSugarMixer {
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
      private milkFrother: MilkSteamer
    ) {
      super(beans);
      this.coffeeBeans = beans;
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // AutomaticSugarMixer 클래스 사용으로 중복으로 작성할 필요 없어짐!
    constructor(private beans: number, private sugar: AutomaticSugarMixer) {
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
      private milk: MilkSteamer,
      private sugar: AutomaticSugarMixer
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

  // 이렇게 작성하게 되면 재사용성이 현저히 떨어진다 (한 가지 행동밖에 못하고, 다른 재료를 아예 넣을 수 없기 때문)
  const cheapMilkMaker = new MilkSteamer();
  const candySugar = new AutomaticSugarMixer();
  const sweetMachine = new SweetCoffeeMaker(12, candySugar);
  const latteMachine = new CafeLatteMachine(12, "SSS", cheapMilkMaker);
  const sweetLatteMachine = new SweetCafeLatteMachine(
    12,
    cheapMilkMaker,
    candySugar
  );
  // 클래스간 서로 상호 작용하는 경우에 클래스 자신을 노출하는 것이 아니라 인터페이스에 의거한 의사소통을 해야 함
}
