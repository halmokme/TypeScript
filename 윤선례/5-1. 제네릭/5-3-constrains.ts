interface Employee {
  pay(): void;
}

class FullTimeEmployee implements Employee {
  pay() {
    console.log(`풀타임 근무!`);
  }
  workFullTime() {
    console.log("");
  }
}

class PartTimeEmployee implements Employee {
  pay() {
    console.log("파트타임 근무!");
  }
  workPartTime() {
    console.log("");
  }
}

// 월급 자동 지불 함수
// payBad(): 세부적인 타입을 인자로 받아서 추상적인 타입으로 다시 리턴하는 함수는 💩
function payBad(employee: Employee): Employee {
  employee.pay();
  return employee;
  // 월급 지급 후 직원을 리턴하는 형태
}
//--------------------------------------------------------
// 제네릭을 활용해서 구현할 것

// <T extends Employee> : 제네릭에서는 extends 키워드로, Employee를 구현한 타입만 가능하다는 조건을 걸 수 있음
function pay<T extends Employee>(employee: T): T {
  // 위 조건으로 employee.pay() 사용 가능
  employee.pay();
  return employee;
}

// 테스트 코드 작성
const jay = new FullTimeEmployee();
const yuna = new PartTimeEmployee();
jay.workFullTime();
yuna.workPartTime();

const jayAfterPay = pay(jay);
const yunaAfterPay = pay(yuna);

// 여기서 jay는 pay 함수밖에 사용할 수 없음.
// FullTimeEmployee 이나 PartTimeEmployee같은 세부 클래스 정보를 잃어버리고 Employee만 리턴되기 때문
jayAfterPay.pay;
// 위 문제를 해결하기 위해 31번째줄~ 제네릭으로 pay 함수 변경

//--------------------------------------------------------
// 제네릭 조건 예제
const obj = {
  name: "chichi",
  age: 17,
};

const obj2 = {
  fruit: "🍒",
};

console.log(getValue(obj, "name"));
console.log(getValue(obj, "age"));
console.log(getValue(obj2, "fruit"));

// 조건부를 사용해서 타입을 세밀하게 제한, 정의할 수 있다
// 오브젝트[키] => 값 도출 가능. getValue 함수는 obj[key]를 리턴
// keyof (타입) => K는 Object T에 있는 키 중 하나.
// T[K] => 리턴 값은 오브젝트 T의 K가 가리키고 있는 value 값
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
