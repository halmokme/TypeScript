{
  // // let es6
  // let name = "hello";
  // name = "hi";

  // // const
  // const age = 1;
  // age = 10;

  /** 
  JavaScript
  Primitive: number, string, boolean, undefined, bigint, symbol, null
  Object: function, array ... 
  */

  // number
  const num: number = -5;

  // string
  const str: string = "2";

  // boolean
  const boal: boolean = true;

  // undefined은 값이 있는지 없는지 아무것도 결정되지 않은 상태
  let name: undefined;
  name = "hello"; // 💩

  let age: number | undefined;
  age = undefined;
  age = 1;
  function find(): number | undefined {
    return undefined;
  }

  // null 조금 더 명확하게, 여기는 텅텅 비어있다고 나타냄
  let person: null;
  person = null;
  person = 1; // 💩

  let person2: string | null;
  person2 = "jane";
  person2 = null;

  // 데이터 또는 undefined를 쓰느냐, 데이터 또는 null을 쓰느냐
  // : 보편적으로 undefined를 많이 씀

  // 값이 있거나 없다는 것을 나타낼 때 < 무언가가 있고 없음을 나타낼 때 >
  // : null을 많이 씀

  // unknown -> 어떤 데이터가 할당될 지 알 수 없음. 💩
  let notSure: unknown = 0;
  notSure = "he";
  notSure = true;

  // any -> 어떤 것이든 담을 수 있는 변수. 💩
  // any 타입은 타입 검사를 하지 않아서, 함수의 인자로 어떤 타입이 들어갔고 어떤 값이 반환되는지는 알 수가 없다.
  // 이 문제를 해결할 수 있는 방법으로 제너릭을 사용한다.
  let anything: any = 0;
  anything = "hello";

  // void -> 함수에서 아무것도 리턴하지 않으면 void. ~공허한, 비어있는~ .
  // 보통은 함수 리턴 타입을 명시하는 것이 좋은 관례. void의 경우 생략 가능 (각 프로젝트의 스타일 가이드 참조)
  function print(): void {
    console.log("hello");
    return;
  }

  // 변수에 선언하는 경우는 극히 드물다 -> undefined 밖에 할당할 수 없기 때문
  let unusable: void = undefined; // 💩

  // never -> 함수에서 절대 리턴되지 않는 경우에 그것을 명시하기 위해 쓰임
  function throwError(message: string): never {
    // message -> server (log)
    // 1. 에러를 던지거나
    throw new Error(message);
    // 2. while문으로 끝나지 않는 코드를 작성해야 함
    while (true) {}

    let neverEnding: never; // 💩
  }

  // object
  let obj: object; // 💩
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" });
  acceptSomeObject({ name: "dog" });
}
