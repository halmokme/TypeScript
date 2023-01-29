{
  // Type Aliases
  type Text = string;
  const name: string = "문자열 타입";
  const text: Text = "직접 정의한 텍스트 타입";
  const address: Text = "korea";
  type Num = number;
  const number: Num = 123;
  type Student = {
    name: string;
    age: number;
  };
  const student: Student = {
    name: "Sara",
    age: 18,
  };

  // * String Literal Types : 타입을 문자열로도 지정할 수 있다.
  type Name = "name";
  let ellieName: Name;
  // Name 타입은 'name'이므로, 동일한 'name'을 써야함
  ellieName = "name";
  type JSON = "json";
  const json: JSON = "json";

  type Boal = true;
  let isCat: Boal = true;
  // 위 예시들처럼 다양한 원시 타입, 오브젝트, 값 자체를 타입으로 결정할 수 있음.
}
