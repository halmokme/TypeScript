// Type Inference
// 타입을 명확하게 명시하지 않아도, 타입이 알아서 자동으로 결정

let text = "hello";
// let text: string = 'hello'처럼 string 타입 결정됨
text = "hi"; // string이 아닌 타입을 넣으면 오류 발생

function print(message = "hello") {
  console.log(message);
}

print("hello");

function add(x: number, y: number) {
  return x + y;
}
// 타입이 자동으로 number 타입으로 추론됨

const result = add(1, 2);
// 추론을 통한 또 다른 추론 가능. add는 숫자를 리턴하는 함수이므로, result도 자동으로 숫자를 리턴

// 타입 추론은 좋은 것이 아님. 간단한 원시 타입 같은 경우에는 생략 가능하지만 타입을 정확하게 명시하는 것이 좋다
// 함수의 경우 - void의 경우 생략 가능하지만, 대부분 실행되는 코드가 안에 많으므로 타입을 명시하는 것이 좋음
