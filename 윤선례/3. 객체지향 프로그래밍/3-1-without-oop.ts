{
  // 커피콩 변수
  // 커피 만들 수 있는 함수 makeCoffee(shots)
  // shots : one shot, two shot

  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };
  const BEANS_GRAM_PER_SHOT: number = 7;

  let coffeeBeans: number = 0;

  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < shots * BEANS_GRAM_PER_SHOT) {
      throw new Error("커피 콩이 충분하지 않습니다.");
    }
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }

  coffeeBeans += 3 * BEANS_GRAM_PER_SHOT;

  const coffee = makeCoffee(2);
  console.log(coffee);
}
