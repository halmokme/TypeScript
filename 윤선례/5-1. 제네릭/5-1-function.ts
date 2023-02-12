{
  // 제네릭 : 클래스, 인터페이스, 메서드의 타입에 대한 일반적인 정의를 제공
  // 클래스 내부에서 사용할 데이터 타입을 일반적으로 정의하여 특정 타입에 국한되지 않고 다양한 타입의 객체를 생성하고 사용할 수 있도록 함
  // 장점 : 코드를 더욱 유연하게 작성하고, 런타임 오류를 줄일 수 있다. 또한, 코드의 재사용성을 높여줄 수 있다

  // 타입을 알 수 없는 js 라이브러리에서(ex: 쿼리셀렉터) 요소가 리턴될 수도, null이 리턴될 수도 있다
  function checkNotNullBad(arg: number | null): number {
    if (arg == null) {
      throw new Error("not valid number");
    }
    return arg;
  }
  // const result = checkNotNullBad(123);
  // console.log(result);
  // checkNotNullBad(null);

  // number뿐만 아니라 아무 타입이나 되게 만드려면 any를 사용해야 할까?
  function checkNotNullAnyBad(arg: any | null): any {
    if (arg == null) {
      throw new Error("not valid number");
    }
    return arg;
  }
  const result = checkNotNullAnyBad(123);
  // result의 타입이 any가 되므로 타입이 보장되지 않음

  // 이 때 제네릭을 사용할 수 있다. 어떤 타입이든 받을 수 있고 사용할 때 타입이 결정되어, 타입이 보장됨
  function checkNotNull<T>(arg: T | null): T {
    if (arg == null) {
      throw new Error("not valid number");
    }
    return arg;
  }

  // 어떤 것이든 호출하는 순간 타입이 된다. 사용자가 타입 결정 -> 유연하고, 컴파일 시간에 타입이 보장됨
  const number = checkNotNull(123);
  const boal: boolean = checkNotNull(true);
}
