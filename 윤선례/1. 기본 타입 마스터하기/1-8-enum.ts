{
  //  * Enum : 여러가지 관련된 상수 값들을 한 곳에 모아서 정의할 수 있게 도와주는 타입
  // JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;
  // 타입이 보장되고, 타입의 값이 변화되지 않으므로 타입을 안전하게 쓸 수 있게 만드는 Enum 타입.

  // TypeScript
  // 타입스크립트의 enum은 앞의 글자만 대문자로 작성
  enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday); // 0
  let day: Days = Days.Saturday;
  day = Days.Tuesday;
  day = 10; // * enum의 문제. enum으로 지정된 타입 변수에 어떤 숫자든 할당할 수 있음
  console.log(day); // 5
  // enum에 따로 값을 지정하지 않으면 0부터 시작.
  // 1부터 시작하게 만들고 싶다면 Monday = 1 로 작성
  // 문자열 할당도 가능. Monday = 'monday' ... 대신 이후 항목들도 하나씩 다 할당해야 함

  // 타입스크립트에서의 enum은 가능하면 쓰지 않는 것이 좋다. enum은 타입이 정확하게 보장되지 않음.

  // 타입스크립트 enum은 대부분의 케이스에서 Union Type으로 대체가 가능
  // 단, 모바일 클라이언트에서만 - 안드로이드나 iOS의 경우 Union Type을 표현할 수 있는 방법이 없어서 enum type을 사용

  // 아래처럼 union type으로 작성
  type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday";
  let dayOfweek: DaysOfWeek = "Monday";
  dayOfweek = "Wednesday";
}
