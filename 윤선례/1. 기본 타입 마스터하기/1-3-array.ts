{
  // Array
  const fruits: string[] = ["๐", "๐"];
  const scores: number[] = [1, 3, 4]; // ํน์ scores: Array<number> ๋ก ์ ์ ๊ฐ๋ฅ
  // object์ ๋ถ๋ณ์ฑ์ ๋ณด์ฅํ๊ธฐ ์ํด readonly ์ฌ์ฉ
  function printArray(fruits: readonly string[]) {} // readonly๋ Array<string>์ด ์์ง ํ์ฉ๋์ง ์์
  // ๋ฐ๋ผ์ ์ผ๊ด์ฑ ์๋ ์ฝ๋๋ฅผ ์ํด ์์ ๊ฐ์ด ์์ฑ

  // Tuple : ์๋ก ๋ค๋ฅธ ํ์์ ๋ฐ์ดํฐ๋ฅผ ๋ด์ ์ ์์ผ๋, interface, type alias, class ๋ก ๋์ฒดํด์ ์ฌ์ฉํ๋ ๊ฒ์ด ์ข์
  let student: [string, number];
  student = ["name", 123];
  // ๋ฐ์ดํฐ์ ์ธ๋ฑ์ค๋ก ์ ๊ทผํ๋ ๊ฒ์ ๊ฐ๋์ฑ์ด ๋จ์ด์ง๋ค
  student[0]; // name
  student[1]; // 123
  // object destructuring ์ฌ์ฉํ๋ฉด ๊ฐ๋์ฑ ๋ฌธ์ ๊ฐ ์กฐ๊ธ ํด๊ฒฐ๋์ง๋ง,
  // ์ฌ์ ํ ๋ฐ์ดํฐ๊ฐ ์ ํด์ง ๊ณณ์ด ์๋๋ผ ๋ฐ์ดํฐ๋ฅผ ์ฌ์ฉํ๋ ๊ณณ์์ ์์๋ก name๊ณผ age๋ผ๊ณ  ๊ฒฐ์ ํ๊ณ  ์ฌ์ฉํด์ผ ํ๋ ๋ฌธ์ ๊ฐ ์๊น
  const [name, age] = student;
  // ๋ฆฌ์กํธ์์ ๋ฆฌํด ํ์์ Tuple๋ก ์ ์ํจ (ex: useState ์ฌ์ฉ ์ ๋ฐํ ๊ฐ).
  // ๋์ ์ผ๋ก ๊ด๋ จ ์๋ ๋ค๋ฅธ ํ์์ ๋ฐ์ดํฐ๋ฅผ ๋ฌถ์ด์ ์ฌ์ฉ์๊ฐ ์ด๋ฆ์ ์ ์ํด์ ์ธ ๊ฒฝ์ฐ Tuple์ด ์ ์ฉํ  ์ ์์ง๋ง ์ผ๋ฐ์ ์ธ ํ์ ์ ์ ํ ์ฌ์ฉํ๋ ๊ฒฝ์ฐ์๋ ๋น์ถ์ฒ.
}
