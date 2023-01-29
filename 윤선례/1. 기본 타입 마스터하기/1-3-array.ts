{
  // Array
  const fruits: string[] = ["🍅", "🍌"];
  const scores: number[] = [1, 3, 4]; // 혹은 scores: Array<number> 로 정의 가능
  // object의 불변성을 보장하기 위해 readonly 사용
  function printArray(fruits: readonly string[]) {} // readonly는 Array<string>이 아직 허용되지 않음
  // 따라서 일관성 있는 코드를 위해 위와 같이 작성

  // Tuple : 서로 다른 타입의 데이터를 담을 수 있으나, interface, type alias, class 로 대체해서 사용하는 것이 좋음
  let student: [string, number];
  student = ["name", 123];
  // 데이터에 인덱스로 접근하는 것은 가독성이 떨어진다
  student[0]; // name
  student[1]; // 123
  // object destructuring 사용하면 가독성 문제가 조금 해결되지만,
  // 여전히 데이터가 정해진 곳이 아니라 데이터를 사용하는 곳에서 임의로 name과 age라고 결정하고 사용해야 하는 문제가 생김
  const [name, age] = student;
  // 리액트에서 리턴 타입을 Tuple로 정의함 (ex: useState 사용 시 반환 값).
  // 동적으로 관련 있는 다른 타입의 데이터를 묶어서 사용자가 이름을 정의해서 쓸 경우 Tuple이 유용할 수 있지만 일반적인 타입 정의 후 사용하는 경우에는 비추천.
}
