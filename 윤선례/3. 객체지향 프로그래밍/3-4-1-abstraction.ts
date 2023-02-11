// 추상화 시켜보기
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMachine implements CoffeeMaker {
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

    // 커피를 만들기 위한 새로운 함수, grindBeans / preheat / extract를 추가하고
    // makeCoffee 함수에 추가한 뒤 const maker에서 호출해보자
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
  }

  const maker: CoffeeMachine = new CoffeeMachine(30);
  maker.fillCoffeeBeans(23);
  // 여기서 maker. 을 입력하면 너무 많은 메소드들이 출력되어 어느 걸 사용해야 할 지 파악하기 어려움
  // 이 때 추상화를 사용. 인터페이스를 간단하고 심플하게 만들어서 사용자도 간편하게 사용할 수 있도록 도와줌

  // 접근 제어자(encapsulation)와 interface를 통해 추상화 가능 (인터페이스가 없는 언어는 정보은닉 방법으로 추상화)

  // 1. 접근 제어자로 추상화 하기 : 호출하면 안되는 함수 앞에 private를 붙임
  // private extract(shots: number): CoffeeCup...
  // private preheat():void { ...
  // private grindBeans(shots: number) { ...
  // 이후 maker.를 호출하면 private을 제외한 함수들만 출력되어서 간단하게 사용 가능

  // 2. interface를 이용한 추상화 : ~~ 행동을 할 수 있다고 명시하는 계약서
  // 인터페이스는 외부적으로 사용하는 이름이므로 간단하게 네이밍함
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }
  // 이후 클래스명에 해당 인터페이스를 구현한다고 명시
  // class CoffeeMachine implements CoffeeMaker {

  // 인터페이스를 구현하는 클래스에서는 인터페이스에 적혀있는 모든 함수(여기서는 makeCoffee)를 구현해야 함

  // 인터페이스를 이용하면 추상화를 극대화해서 사용할 수 있음
  const maker2: CoffeeMaker = new CoffeeMachine(30);
  maker2.makeCoffee(23);
  // 인터페이스에 없는 함수는 사용할 수 없다. 따라서, 내가 얼마만큼의 행동을 허용할 것인지 규약 가능
}
