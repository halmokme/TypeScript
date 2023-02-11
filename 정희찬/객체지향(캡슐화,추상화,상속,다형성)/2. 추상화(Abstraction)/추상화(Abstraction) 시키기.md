### 추상화란?

외부에서 클래스를 볼 경우 인터페이스가 복잡하거나 사용할 함수가 너무 많을경우

- 클래스를 개선한다.
- 복잡한 클래스를 간단하게 만드는 방법이다.
- **인터페이스를 간단하게 하는 방법이다.**
- 언어마다 할 수 있는 방법이 달라진다.
- **캡슐화**, interface, 정보은닉 을 통해서 충분히 추상화를 진행할 수 있다.
- 코드를 작성할 때 더욱 편리해진다.

### 추상화 하는 방법

### 예제 코드 - **추상화를 하기전의 코드**

- maker. 을 입력시 많은 함수가 보이게 된다.
  - 다양한 메서드들이 보이게 된다.
- 사용하는 사람이 어떤 것을 먼저 진행해야 하는지 헷갈리게 된다.
  : 커피를 내리는 과정을 사용자가 코드를 작성할 때 마다 고민해야한다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
    }

    preheat() {
      console.log(`heating up...`);
    }

    extract(shots: number): CoffeeCup {
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

      //   if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
      //     throw new Error("Not enough coffee beans!");
      //   }
      //   this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      //   return {
      //     shots,
      //     hasMilk: false,
      //   };
    }
  }

  const maker = CoffeeMaker.makeMachine(24);
  // maker. 을 입력시 많은 함수가 보이게 된다.
  // 사용하는 사람이 헷갈리게 된다.
}
```

### 예제 코드 - 정보은닉을 통한 추상화

- private 을 통해서 정보은닉을 한다.
  - grindBeans(), preheat(), extract() 를 private화 하여 maker. 을 입력시 사용할 수 있는 메서드 2가지만 보이게 된다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  class CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
      this.coffeeBeans = coffeeBeans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMaker {
      return new CoffeeMaker(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) {
        throw new Error("value for beans should be greater than 0");
      }
      this.coffeeBeans += beans;
    }

    private grindBeans(shots: number) {
      console.log(`grinding beans for ${shots}`);
      if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
        throw new Error("Not enough coffee beans!");
      }
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
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

      //   if (this.coffeeBeans < shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT) {
      //     throw new Error("Not enough coffee beans!");
      //   }
      //   this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAMM_PER_SHOT;
      //   return {
      //     shots,
      //     hasMilk: false,
      //   };
    }
  }

  const maker = CoffeeMaker.makeMachine(24);
}
```

### 예제 코드 - interface를 통한 추상화

**interface란?**

- 규약을 정하고, 어떤 행동을 할 수 있는지 정할 수 있는 계약서 같은 존재
- interface의 규격을 따라가기 위해 implements CoffeeMaker 를 추가한다.
  - implements를 하는 이유 : 인터페이스에서 요구하는 함수들을 다 구현했는지 문법적으로 체크 받을 수 있다.
- interface를 구현하는 클래스에서는 interface에서 규약된 모든 함수를 구현해야한다.
  - 구현하지 않으면 에러 발생.
- 추상화를 극대화 시킬 수 있다.

**interface 이름**

- 외부에서 사용하기 때문에 이름을 잘 지어야함.
- 이름 규칙은 상황에 맞게 정하면 된다.
- 구현하는 클래스와는 이름을 다르게한다.

```tsx
{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // 외부에서 사용하기 때문에 이름을 잘 지어야함.
  // 이름 규칙은 상황에 맞게 정하면 된다.
  // 구현하는 클래스와는 이름을 다르게한다.
  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAMM_PER_SHOT: number = 7;
    protected coffeeBeans: number = 0;

    private constructor(coffeeBeans: number) {
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

  // maker의 타입은 CoffeeMachine이 될 수 있다.
  const maker: CoffeeMachine = CoffeeMachine.makeMachine(24);
  maker.fillCoffeeBeans(32);
  maker.makeCoffee(2);

  // maker2의 타입은 CoffeeMaker도 될 수 있다.
  // CoffeeMaker와 CoffeeMachine은 같은 타입이다.
  const maker2: CoffeeMaker = CoffeeMachine.makeMachine(24);
  maker2.fillCoffeeBeans(32); // interface에 없는 함수는 사용할 수 없다.
  maker2.makeCoffee(2);
}
```
