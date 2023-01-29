{
  // 타입을 강요할 때 Type Assertions. 💩
  // 타입이 없는 자바스크립트와 연동되는 경우가 있어 불가피하게 사용할 수 있음

  function jsStrFunc(): any {
    return "hello";
  }

  const result = jsStrFunc();
  // (result as string) -> result 변수는 문자열이 확실하니까, 문자열처럼 사용할 거야
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 😭 오류 -> 타입을 장담할 수 있는 경우가 아니라면 사용 X

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers(); // 함수 호출 뒤에 !를 붙여도 확정하는 것. findNumbers()!;
  numbers!.push(2); // !.를 쓰면 옵션이 아닌, 절대적으로 값이 있다고 확정하는 것

  const button = document.querySelector("class")!;
  if (button) {
    button.nodeValue;
  }
}
