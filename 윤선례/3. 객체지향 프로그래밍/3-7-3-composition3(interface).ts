// 상속의 단점을 보완할 수 있는 Composition 활용하기 3 + interface
// interface를 활용하면, 객체 간의 관계를 정의하고, 객체 간의 관계를 강제하지 않아도 동작하는 코드를 작성할 수 있다
// 각각의 기능을 하는 부품(거품기..), 인터페이스, 커피 머신만 있으면 모든 종류의 커피 머신을 만들 수 있음
// 아래 예제 : CoffeeMachine 클래스 하나만으로 다양한 종류의 커피 머신을 만들어 낼 수 있는 예제

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
    constructor(
      coffeeBeans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      this.coffeeBeans = coffeeBeans;
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
      const coffee = this.extract(shots);
      const sugarAdded = this.milk.makeMilk(coffee);
      return this.milk.makeMilk(sugarAdded);
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

  class NoMilk implements MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
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

  class NoSugar implements SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // Milk
  const cheapMilkMaker = new MilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new AutomaticSugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  // const sweetCandyMachine = new SweetCoffeeMaker(12, candySugar);
  // 이제 위 예제처럼 머신을 하나하나 만들지 않고, CoffeeMachine 클래스만 이용하면서
  // 필요한 요소만 인자로 넣어서 조합할 수 있음
  const sweetCandyMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const fancyLatteMachine = new CoffeeMachine(12, fancyMilkMaker, noSugar);

  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);

  // composition을 통해 상속을 사용하지 않고도 커피머신 클래스 하나만으로 다양한 형태의 오브젝트를 생성 가능
  // 너무 수직적인 관계일 경우 composition으로 대체하는 방법으로 확장, 재사용, 유지보수의 이점을 가진 코드를 만들 수 있다
}
