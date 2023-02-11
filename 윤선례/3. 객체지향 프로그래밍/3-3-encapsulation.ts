// 캡슐화 시켜보기
// 외부에서 접근할 수 있는 것은 무엇인지, 내부적으로만 가지고 있어야 하는 데이터는 무엇인지 결정할 수 있음

{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 다양한 레벨 정보를 아래 키워드로 은닉 가능
  // public : 따로 작성 x시
  // private
  // protected

  class CoffeeMachine {
    private static BEANS_GRAM_PER_SHOT: number = 7;
    private coffeeBeans: number = 0;

    constructor(beans: number) {
      this.coffeeBeans = beans;
    }

    // 아래처럼 static 키워드를 붙여서 오브젝트를 만들 수 있는 함수를 제공한다는 것은
    // 생성자로 생성하는 것을 금지하기 위해 사용
    // private constructor으로 만들어서, static 메소드를 이용할 수 있도록 권장하는 것이 좋음
    // const maker = new CoffeeMaker(32)가 아니라,
    // const maker = CoffeeMaker.makeMachine(32) 형태로 오브젝트를 만들 수 있다
    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    // 내부 상태를 프라이빗으로 숨겨놓고,
    // 외부에서 퍼블릭한 fillCoffeeBeans 함수를 통해 내부의 상태를 변경할 수 있도록 만듦
    // 함수를 이용하기 때문에, 전달받는 인자가 유효한지 검사 -> 안정성 증가
    // 기본적으로 public,
    // 외부에서 절대 볼 수 없고 접근할 수 없는 private,
    // protected는 외부 접근 x , 클래스를 상속한 자식 클래스에서만 접근 가능
    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("커피콩의 양은 0보다 커야 합니다.");
      }
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < shots * CoffeeMachine.BEANS_GRAM_PER_SHOT) {
        throw new Error("커피 콩이 충분하지 않습니다.");
      }
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }

  const maker = new CoffeeMachine(30);
  // maker.coffeeBeans = 3;
  // maker.coffeeBeans = -29; // invalid
  // 이제 커피콩은 fillCoffeeBeans 함수로 추가할 수 있다
  maker.fillCoffeeBeans(23);
  // 제약 사항이 없으므로 외부에서 오브젝트 상태를 유효하지 않은 상태로 만들 수 있음
  // encapsulation으로 가릴 수 있다

  // -------- getter와 setter --------
  // class User {
  //   firstName: string;
  //   lastName: string;
  //   fullName: string;
  //   constructor(firstName: string, lastName: string) {
  //     this.firstName = firstName;
  //     this.lastName = lastName;
  //     this.fullName = `${firstName} ${lastName}`;
  //   }
  // }

  // const user = new User("Steve", "Jobs");
  // console.log(user.fullName);
  // user.firstName = "Yun";
  // console.log(user.fullName); // 콘솔 로그에 변경 없이 Steve Jobs로 출력
  // // fullName이 한번 할당되면 계속 지정되어 있기 때문. 이 때 getter 사용

  class User {
    // 생성자에 전달된 이름은 변경할 수 없으면, 외부에서 변경 불가능 하도록 private 설정 가능
    // 생성자에 접근 제어자 private을 설정하면 바로 멤버 변수로 설정됨 (아래에서 설명)
    firstName: string;
    lastName: string;
    // 위 방법이 아닌, get을 이용해 fullName을 정의할 수 있음
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
  // ----------------------------
  // 생성자에 접근 제어자 private을 설정, 바로 멤버 변수로 설정해서 더 깔끔한 코드로 작성하는 방법
  // class User {
  //   get fullName(): string {
  //     return `${this.firstName} ${this.lastName}`;
  //   }

  //   private internalAge = 4;
  //   get age(): number {
  //     return this.internalAge;
  //   }
  //   set age(num: number) {
  //     if( num < 0 ) {
  //       // getter와 setter를 쓰면 다양한 연산이나, 전달된 숫자가 정확한지 등
  //       // 에러 메시지를 보여주거나, 원하는 유효성 검사 가능
  //     }
  //     this.internalAge = num;
  //   }

  //   constructor(private firstName: string, private lastName: string) {
  //   }

  //   user.age = 6;
  //   // user.internalAge 로 접근할 순 없지만 getter와 setter를 이용한 user.age로는 접근 가능
  //   // 6으로 지정하면, setter가 호출 되면서 internalAge를 6으로 업데이트 하게 됨
  // }

  // const user = new User("Steve", "Jobs");
  // // 접근할 때는 멤버 변수에 접근하는 것처럼 user.fullName으로 작성
  // console.log(user.fullName);
  // user.firstName = "Chi";
  // console.log(user.fullName); // 콘솔 로그에 변경 없이 Steve Jobs로 출력
  // // fullName이 한번 할당되면 계속 지정되어 있기 때문. 이 때 getter 사용
}
