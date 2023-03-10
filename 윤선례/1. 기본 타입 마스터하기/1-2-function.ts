{
  // JavaScript ๐ฉ
  function jsAdd(num1, num2) {
    return num1 + num2;
  }

  // TypeScript
  function add(num1: number, num2: number): number {
    return num1 + num2;
  }

  // JavaScript ๐ฉ
  function jsFetchNum(id) {
    // code..
    // code..
    // code..
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // TypeScript
  // ํ์์ ์ฐ๋ ๊ฒ์ ์์ ์  ํ๋ก๊ทธ๋๋ฐ, ํ์์ ์ ์ํจ์ผ๋ก์ ๋ ๋์ ๋ฌธ์ํ ๊ฐ๋ฅ
  function fetchNum(id: string): Promise<number> {
    // code..
    // code..
    // code..
    return new Promise((resolve, reject) => {
      resolve(100);
    });
  }

  // JavaScript => TypeScript
  // Optional parameter : ์ธ์๋ฅผ ์ ๋ฌํด๋ ๋๊ณ , ์ ๋ฌํ์ง ์์๋ ๋จ. ์ ๋ฌํ์ง ์์ผ๋ฉด undefined ์ถ๋ ฅ
  // lastName: string | undefined ๋ก ์ ๋ฌํ๋ฉด, ํธ์ถ ์ ๋ฌด์กฐ๊ฑด lastName ์๋ฆฌ์ ์ ๋ฌ ์ธ์๊ฐ ์์ด์ผ ํจ.
  // ์ ๋ฌํ  ๊ฒ์ด ์์ด๋ undefined๋ฅผ ์จ์ผ ํ๋ฏ๋ก ๋ณด๊ธฐ ์ซ์ด์ง. ๊ทธ๋ฌ๋ lastName?: string ์ผ๋ก ๊ฐํธํ๊ฒ ์์ฑํ๊ธฐ
  function printName(firstName: string, lastName?: string) {
    console.log(firstName);
    console.log(lastName);
  }
  printName("Steve", "Jobs"); // ๋ ๋ค ์ ๋ฌํ  ์๋ ์๊ณ 
  printName("Ellie"); // ํ๋๋ง ์ ๋ฌํ  ์๋ ์์ (lastName?: string์ผ๋ก ์ต์๋ ์ค์  ๋์ด์๊ธฐ ๋๋ฌธ )
  printName("Anna", undefined); // undefined๋ฅผ ๋ช์ํด์ ์ ๋ฌ๋ ๊ฐ๋ฅ

  // Default parameter : ์ ๋ฌํ์ง ์์ผ๋ฉด ๊ธฐ๋ณธ ๊ฐ์ผ๋ก ์ค์ ๋จ
  function printMessage(message: string = "๊ธฐ๋ณธ ๋ฉ์์ง") {
    console.log(message);
  }
  printMessage();

  // Rest parameter : ๊ฐ์์ ์๊ด์์ด ๋์ผ ํ์ ๋ฐ์ดํฐ๋ฅผ ํจ์ ์ธ์๋ก ์ ๋ฌํ  ๋ ์ฌ์ฉ
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b);
  }

  console.log(addNumbers(1, 2));
  console.log(addNumbers(1, 2, 3, 4));
  console.log(addNumbers(1, 2, 3, 4, 5, 0));
}
