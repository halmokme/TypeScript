/**
 * Let's make a calculator 🧮
 */
// 내가 짠코드 - type Aliases를 사용하지 않음. 코드가 치기 길어졌다.
// const calculate = (oper: string, num1: number, num2: number): number => {
//   let result: number = 0;
//   switch (oper) {
//     case "add":
//       result = num1 + num2;
//       break;
//     case "substract":
//       result = num1 - num2;
//       break;
//     case "multiply":
//       result = num1 * num2;
//       break;
//     case "divide":
//       result = num1 / num2;
//       break;
//     case "remainder":
//       result = num1 % num2;
//       break;
//   }
//   return result;
// };

type Command = "add" | "substract" | "multiply" | "divide" | "remainder";
const calculate = (command: Command, num1: number, num2: number): number => {
  switch (command) {
    case "add":
      return num1 + num2;
    case "substract":
      return num1 - num2;
    case "multiply":
      return num1 * num2;
    case "divide":
      return num1 / num2;
    case "remainder":
      return num1 % num2;
    default:
      throw Error("unknown command");
  }
};

console.log(calculate("add", 1, 3)); // 4
console.log(calculate("substract", 3, 1)); // 2
console.log(calculate("multiply", 4, 2)); // 8
console.log(calculate("divide", 4, 2)); // 2
console.log(calculate("remainder", 5, 2)); // 1
