// a 또는 b

interface Either {
  left: () => number;
  right: () => number;
}

// // Either 인터페이스를 받는 SimpleEither 클래스 만들기
class SimpleEither implements Either {
  constructor(private leftValue: number, private rightValue: number) {}
  left(): number {
    return this.leftValue;
  }
  right(): number {
    return this.rightValue;
  }
}
const either = new SimpleEither(4, 5);
console.log(either.left()); //4
console.log(either.right()); //5

// 위 클래스가 왼쪽, 오른쪽 숫자만 담는 것이 아니라 특정한(유연한) 타입을 받으려면 제네릭 활용
// 사용자가 타입을 결정할 것, 호출 시 어떤 타입이 나올 지 정의
interface EitherTwo<L, R> {
  left: () => L;
  right: () => R;
}

class SimpleEitherTwo<L, R> implements EitherTwo<L, R> {
  constructor(private leftValue: L, private rightValue: R) {}
  left(): L {
    return this.leftValue;
  }
  right(): R {
    return this.rightValue;
  }
}

const eitherTwo: EitherTwo<number, string> = new SimpleEitherTwo(2, "둘");
console.log(eitherTwo.left()); // 2
console.log(eitherTwo.right()); // "둘"
const eitherBest = new SimpleEitherTwo({ name: "셋" }, "넷");
console.log(eitherBest.left()); // {name: "셋"}
console.log(eitherBest.right()); // "넷"
