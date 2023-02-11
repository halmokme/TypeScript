**Composition을 사용하는 이유**

- 상속의 문제점
  - 상속의 깊이가 깊어질 수록 복잡해질 수 있다.
  - 수직적으로 관계가 형성 된다.
  - 부모 클래스를 수정하게 되면 상속하는 자식 클래스에 모든 영향을 미친다.
    **- 타입스크립트 : 한 가지 이상의 부모클래스를 상속할 수 없다.**

```tsx
// 클래스는 단일 클래스만 확장할 수 있습니다 라는 오류가 발생함
class SweetCaffeLatteMachine extends SweetCoffeeMaker, CaffeLatteMachine{
        ...
}
```

### 상속 대신 Composition 을 더 지향해야한다.

Composition 이란?

- 필요한 것들을 모아서 합쳐나간다.
- 코드의 재사용성을 높여준다.
- **클래스들 끼리 연결 시켜놓았을 때의 치명적 단점**
  CoffeeMachine, CaffeLatteMachine, SweetCaffeLatteMachine는
  CheapMilkSteamer, AutomaticSugarMixer와 타이트하게 커플링되어 있다.
  **클래스와 클래스들 간에 너무 깊게 연관되어 있으면 좋지 않다.**
  ⇒ CheapMilkSteamer, AutomaticSugarMixer을 항상 사용해야하고 다른 클래스를 사용하게 될 경우 모든 클래스를 업데이트 해야한다.

### 코드 : 아직 덜 완성되어 있음.

```
{
  type CoffeeCup = {
    ...
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // 싸구려 우유 거품기
  class CheapMilkSteamer {
    private steamMilk(): void {
      console.log("스팀밀크 생성");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }
  // 설탕 제조기
  class AutomaticSugarMixer {
    private getSuger() {
      console.log("설탕을 설탕 봉투로부터 가져온다.");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSuger();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  class CoffeeMachine implements CoffeeMaker {
    ...
  }

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: CheapMilkSteamer
    ) {
      super(beans);
    }

    // 위(CheapMilkSteamer)에서 생성 했기때문에 필요 없음
    // 외부에서 주입받아 온다. - constructor 에 추가 -> dependency injection 이라고한다.
    // private steamMilk(): void {
    //   console.log("스팀밀크 생성");
    // }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      //   this.steamMilk();
      //   return {
      //     ...coffee,
      //     hasMilk: true,
      //   };
      return this.milkFrother.makeMilk(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    constructor(private beans: number, private sugar: AutomaticSugarMixer) {
      super(beans);
    }
    // getSuger() {
    //   console.log("설탕 추가");
    // }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      //   this.getSuger();
      //   return {
      //     ...coffee,
      //     hasSugar: true,
      //   };
      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private sugar: AutomaticSugarMixer,
      private milk: CheapMilkSteamer
    ) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdd = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdd);
    }
  }
}
```

### Interface를 이용한 코드 개선

- 다른 클래스를 받아오는게 아닌 interface를 받아온다.
  - **interface를 통해서 디커플링을 할 수 있다.**
  - interface를 통해서 클래스간의 의사소통이 가능해진다.
  - 다양한 클래스를 생성 가능해진다.

```
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // -----------------------
  // 아래의 interface를 통해서 디커플링을 할 수 있다.
  // interface를 통해서 의사소통이 가능해진다.
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  // MilkFrother라는 인터페이스를 구현하는 클래스가 된다.
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("스팀밀크 생성");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // MilkFrother라는 인터페이스를 구현하는 클래스가 된다.
  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("고오오오급 스팀밀크 생성");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // MilkFrother라는 인터페이스를 구현하는 클래스가 된다.
  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("차가운 스팀밀크 생성");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // 설탕 제조기
  // SugarProvider라는 인터페이스를 구현하는 클래스가 된다.
  class CandySugarMixer implements SugarProvider {
    private getSuger() {
      console.log("설탕을 설탕 봉투로부터 가져온다.");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSuger();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  // SugarProvider라는 인터페이스를 구현하는 클래스가 된다.
  class SugarMixer implements SugarProvider {
    private getSuger() {
      console.log("설탕을 설탕 봉투로부터 가져온다.");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSuger();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
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

  class CaffeLatteMachine extends CoffeeMachine {
    constructor(
      beans: number,
      public readonly serialNumber: string,
      private milkFrother: MilkFrother // Interface를 받아옴
    ) {
      super(beans);
    }

    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.milkFrother.makeMilk(coffee);
    }
  }

  class SweetCoffeeMaker extends CoffeeMachine {
    // SugarProvider Interface를 받아옴
    constructor(private beans: number, private sugar: SugarProvider) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return this.sugar.addSugar(coffee);
    }
  }

  class SweetCaffeLatteMachine extends CoffeeMachine {
    constructor(
      private beans: number,
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      super(beans);
    }
    makeCoffee(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      const sugarAdd = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdd);
      //   hasMilk?: boolean | undefined;
      //   hasSugar?: boolean | undefined;
    }
  }

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();

  // Sugar
  const candySuger = new CandySugarMixer();
  const sugar = new SugarMixer();

  //
  const sweetCandMachine = new SweetCoffeeMaker(12, candySuger);
  const sweetMachine = new SweetCoffeeMaker(12, sugar);

  const latteMachine = new CaffeLatteMachine(12, "SS", cheapMilkMaker);
  const coldLatteMachine = new CaffeLatteMachine(12, "SS", coldMilkMaker);
  const sweetLatteMachine = new SweetCaffeLatteMachine(
    12,
    cheapMilkMaker,
    candySuger
  );
}
```

- 부품을 만들어서 확장성을 늘릴 수 있다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk?: boolean;
    hasSugar?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // -----------------------
  // 아래의 interface를 통해서 디커플링을 할 수 있다.
  // interface를 통해서 의사소통이 가능해진다.
  interface MilkFrother {
    makeMilk(cup: CoffeeCup): CoffeeCup;
  }

  interface SugarProvider {
    addSugar(cup: CoffeeCup): CoffeeCup;
  }

  // 싸구려 우유 거품기
  // MilkFrother라는 인터페이스를 구현하는 클래스가 된다.
  class CheapMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("스팀밀크 생성");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // MilkFrother라는 인터페이스를 구현하는 클래스가 된다.
  class FancyMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("고오오오급 스팀밀크 생성");
    }
    makeMilk(cup: CoffeeCup): CoffeeCup {
      this.steamMilk();
      return {
        ...cup,
        hasMilk: true,
      };
    }
  }

  // MilkFrother라는 인터페이스를 구현하는 클래스가 된다.
  class ColdMilkSteamer implements MilkFrother {
    private steamMilk(): void {
      console.log("차가운 스팀밀크 생성");
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
    // 아무것도 하지 않는다.
    makeMilk(cup: CoffeeCup): CoffeeCup {
      return cup;
    }
  }

  // 설탕 제조기
  // SugarProvider라는 인터페이스를 구현하는 클래스가 된다.
  class CandySugarMixer implements SugarProvider {
    private getSuger() {
      console.log("설탕을 설탕 봉투로부터 가져온다.");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSuger();
      return {
        ...cup,
        hasSugar: sugar,
      };
    }
  }

  // SugarProvider라는 인터페이스를 구현하는 클래스가 된다.
  class SugarMixer implements SugarProvider {
    private getSuger() {
      console.log("설탕을 설탕 봉투로부터 가져온다.");
      return true;
    }

    addSugar(cup: CoffeeCup): CoffeeCup {
      const sugar = this.getSuger();
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

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    public constructor(
      coffeeBeans: number,
      //-- 전달 받은 MilkFrother, SugarProvider에 따라 기능이 결정된다.
      private milk: MilkFrother,
      private sugar: SugarProvider
    ) {
      this.coffeeBeans = coffeeBeans;
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

      // --
      const coffee = this.extract(shots); // 커피 추출
      const sugarAdded = this.sugar.addSugar(coffee);
      return this.milk.makeMilk(sugarAdded);
    }
  }

  // 아래 여러 클래스를 제거 하고 CoffeeMachine으로 통합할 수 있다.
  //   class CaffeLatteMachine extends CoffeeMachine {...}
  //   class SweetCoffeeMaker extends CoffeeMachine {...}
  //   class SweetCaffeLatteMachine extends CoffeeMachine {...}

  // Milk
  const cheapMilkMaker = new CheapMilkSteamer();
  const fancyMilkMaker = new FancyMilkSteamer();
  const coldMilkMaker = new ColdMilkSteamer();
  const noMilk = new NoMilk();

  // Sugar
  const candySugar = new CandySugarMixer();
  const sugar = new SugarMixer();
  const noSugar = new NoSugar();

  //   const sweetCandMachine = new SweetCoffeeMaker(12, candySugar);
  //   const sweetMachine = new SweetCoffeeMaker(12, sugar);
  //   const latteMachine = new CaffeLatteMachine(12, "SS", cheapMilkMaker);
  //   const coldLatteMachine = new CaffeLatteMachine(12, "SS", coldMilkMaker);
  //   const sweetLatteMachine = new SweetCaffeLatteMachine(
  //     12,
  //     cheapMilkMaker,
  //     candySugar
  //   );
  const sweetCandMachine = new CoffeeMachine(12, noMilk, candySugar);
  const sweetMachine = new CoffeeMachine(12, noMilk, sugar);

  const latteMachine = new CoffeeMachine(12, cheapMilkMaker, noSugar);
  const coldLatteMachine = new CoffeeMachine(12, coldMilkMaker, noSugar);
  const sweetLatteMachine = new CoffeeMachine(12, cheapMilkMaker, candySugar);
}
```

### 추가 생각.

- 상속의 깊이가 너무 깊어진다면 composition을 사용할 수 있는지 생각해본다.
- 상속이 무조건 나쁜편이 아니다.
- composition을 통해서 유지보수, 퀄리티 등을 개선하는데 생각할 수 있다.
- 미리 코드를 확장성 등 개선할 수 있는 생각을 하는것 보다 일정에 맞추어야 한다.
