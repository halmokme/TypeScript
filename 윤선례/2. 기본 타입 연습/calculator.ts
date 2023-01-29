/**
 * Let's make a calculator 🧮
 */

// type 항목이 'add' 면 +
type Operator = "add" | "subtract" | "multiply" | "divide" | "remainder";

function calculate(type: Operator, num1: number, num2: number): number {
  if (type === "add") {
    return num1 + num2;
  }
  if (type === "subtract") {
    return num1 - num2;
  }
  if (type === "multiply") {
    return num1 * num2;
  }
  if (type === "divide") {
    return num1 / num2;
  }
  if (type === "remainder") {
    return num1 % num2;
  } else throw new Error("unknown error");
}
// switch 문으로 대체 가능

console.log(calculate("add", 1, 3)); // 4
console.log(calculate("subtract", 3, 1)); // 2
console.log(calculate("multiply", 4, 2)); // 8
console.log(calculate("divide", 4, 2)); // 2
console.log(calculate("remainder", 5, 2)); // 1
