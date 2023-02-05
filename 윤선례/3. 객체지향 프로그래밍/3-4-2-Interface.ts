// 인터페이스 활용하기
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // CoffeeMaker와 CommercialCoffeeMaker 인터페이스 규약을 따름
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

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

  // 접근 제어자(encapsulation)와 interface를 통해 추상화 가능 (인터페이스가 없는 언어는 정보은닉 방법으로 추상화)
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
    fillCoffeeBeans(beans: number): void;
    clean(): void;
  }

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
      this.machine.fillCoffeeBeans(34);
      this.machine.clean();
    }
  }

  // 인터페이스로 타입을 제한해서 받게 되면, 인터페이스에서 정의된 것들만 사용 가능
  // const maker: CoffeeMachine = new CoffeeMachine(30);
  // maker.fillCoffeeBeans(23);
  // maker.makeCoffee(2);

  // const maker2: CommercialCoffeeMaker = new CoffeeMachine(30);
  // maker2.fillCoffeeBeans(23);
  // maker2.makeCoffee(23);
  // maker2.clean();

  // 인터페이스에 제한된 함수만 쓸 수 있어서 쓸 수 있는 범위가 달라지게 된다
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(32);
  const amateur = new AmateurUser(maker);
  const pro = new ProBarista(maker);

  pro.makeCoffee();

  // 동일한 오브젝트의 인스턴스 일지라도, 오브젝트는 두 가지 인터페이스를 구현함
  // 아마추어 유저는 CoffeeMaker를, 프로 바리스타는 CommercialCoffeeMaker 인터페이스를 생성자에서 받아옴 ->
  // 클래스보다 좁은 범위의, 인터페이스에서 규약된 함수만 접근 가능

  // AmateurUser와 ProBarista는
  // 인터페이스에 규약된 함수들만 이용해서 생성된 오브젝트와 의사소통 가능

  // 사용자는 클래스에 신경쓰지 않고, 인터페이스만 알면 된다는 장점이 있음
}
