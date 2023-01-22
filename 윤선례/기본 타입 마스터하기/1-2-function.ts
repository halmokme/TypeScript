{
  // JavaScript 💩
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TypeScript
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript 💩
  function jsFetchNum(id) {
    // code..
    // code..
    // code..
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // TypeScript
  // 타입을 쓰는 것은 안정적 프로그래밍, 타입을 정의함으로서 더 나은 문서화 가능
  function fetchNum(id: string): Promise<number> {
    // code..
    // code..
    // code..
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // JavaScript => TypeScript
  // Optional parameter : 인자를 전달해도 되고, 전달하지 않아도 됨. 전달하지 않으면 undefined 출력
  // lastName: string | undefined 로 전달하면, 호출 시 무조건 lastName 자리에 전달 인자가 있어야 함.
  // 전달할 것이 없어도 undefined를 써야 하므로 보기 싫어짐. 그러니 lastName?: string 으로 간편하게 작성하기
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName("Steve", "Jobs"); // 둘 다 전달할 수도 있고
  printName("Ellie"); // 하나만 전달할 수도 있음 (lastName?: string으로 옵셔널 설정 되어있기 때문 )
  printName("Anna", undefined); // undefined를 명시해서 전달도 가능

  // Default parameter : 전달하지 않으면 기본 값으로 설정됨
  function printMessage(message: string = "기본 메시지") {
    console.log(message);
  }
  printMessage();

  // Rest parameter : 개수에 상관없이 동일 타입 데이터를 함수 인자로 전달할 때 사용
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }
  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));
}
