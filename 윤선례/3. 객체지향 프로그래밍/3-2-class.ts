{
  // 오브젝트를 이용해서 커피 기계 만들기
  // 커피 머신이라는 클래스
  // 클래스에는 coffeeBeans, makeCoffee 함수가 있음
  // 클래스를 이용한 인스턴스(커피 머신)객체를 만들어서
  // 커피를 만드는 테스팅 코드까지 만들기

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 클래스 : 관련있는 데이터나 함수들을 한꺼번에 묶어둠, 템플릿
  // const, let 키워드는 클래스 내에서 사용하지 않음
  class CoffeeMachine {
    BEANS_GRAM_PER_SHOT: number = 7;
    coffeeBeans: number = 0;

    constructor(beans: number) {
      // this.coffeeBeans : 클래스(this)안에 있는 것
      // beans : 함수로 들어온 인자
      this.coffeeBeans = beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      // 클래스 안의 멤버 변수에 접근할 땐 this.을 붙여준다
      if (this.coffeeBeans < shots * this.BEANS_GRAM_PER_SHOT) {
        throw new Error("커피 콩이 충분하지 않습니다.");
      }
      this.coffeeBeans -= shots * this.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMachine(30);
  console.log(maker);
  const maker2 = new CoffeeMachine(13);
  console.log(maker2);

  // class에서 한번 정의되어지고 클래스를 이용한 오브젝트 사이에서 다 공유될 수 있는 것은
  // 멤버 변수도 두게 되면, object를 만들 때마다 중복적으로 데이터가 생성됨
  // -> CoffeeMachine { BEANS_GRAM_PER_SHOT: 7, coffeeBeans: 30 } 메모리 낭비

  // 이 경우 static 키워드를 붙여서, class 레벨로 지정함
  // static 붙이지 않으면 instance(object) 레벨이 됨

  // class 레벨 = class와 연결 되어있다. object마다 만들어지거나 생성되지 않는다
  // class 자체에 있는 것이 되므로, this.을 쓰지 않고, class 이름을 지정한다
  // this.BEANS_GRAMM_PER_SHOT이 아닌, CoffeeMaker.BEANS_GRAM_PER_SHOT이 되는 것.

  // class는 관련된 속성과 함수들을 묶어서 어떤 모양의 데이터가 될 것이라고 정의하는 것
  // 정의된 class를 이용해서 실제로 데이터를 넣어서 object를 만들 수 있음
  // object마다 새로 만들어져야 되는 데이터가 있다면 멤버 변수로 만듦
  // class 레벨에서 함께 공유될 수 있는 것이라면 static을 이용
  // static은 멤버 변수 뿐만 아니라 함수에서도 적용이 됨

  // * 예제
  // static makeMachine(coffeeBeans: number): CoffeeMaker {
  //   return new CoffeeMaker(coffeeBeans)
  // };

  // 클래스 내부의 어떤 속성값도 필요하지 않게 됨 -> 클래스 레벨에서 활용할 수 있게 static 을 붙임
  // 외부에서도 CoffeeMaker 클래스의 makeMachine 함수를 이용해 간단하게 사용 가능
  // CoffeeMaker.makeMachine(3)

  // 클래스 레벨의 대표적인 예 ) Math.abs
  // Math안에 들어있는 것은 클래스 레벨에 있으므로,
  // 오브젝트 생성없이 클래스 레벨에서 함수들을 호출할 수 있음
}
