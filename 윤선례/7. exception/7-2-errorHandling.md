# 에러 처리의 기본 (try, catch, finally)

Error(Exception) Handling: try -> catch -> finally
심각한 오류라면 어플리케이션이 죽을 것 (메모리 문제, 복구할 수 없는 문제 등..)
**try와 catch를 이용해 의미있는 에러 메시지를 보여주거나, 복구를 할 수 있다**

### **에러 처리 예제 :**

readFile, closeFile 함수를 이용해 \*\*\*\*파일 읽는 함수를 호출(파일 내용 출력)하고 파일 닫는 함수 사용하기

**파일 읽어주는 함수 readFile**

파일 이름이 존재하지 않는다면 에러 출력

에러 관련 정보들을 디테일하게 담는 것이 좋다

파일이 있을 때만 파일 컨텐츠를 출력

**파일 닫는 함수 closeFile**

```tsx
function readFile(fileName: string): string {
  if (fileName === "존재하지 않는 파일") {
    throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
  }
  return "파일을 읽습니다. 📂";
}

function closeFile(fileName: string) {}

const fileName = "file";
console.log(readFile(fileName));
closeFile(fileName);
```

---

이제 파일 이름을 ‘존재하지 않음’ 으로 변경하면, 에러 발생

```tsx
function readFile(fileName: string): string {
  if (fileName === "존재하지 않는 파일") {
    throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
  }
  return "파일을 읽습니다. 📂";
}

function closeFile(fileName: string) {}
// 파일 이름을 '존재하지 않는 파일'로 변경
const fileName = "존재하지 않는 파일";
console.log(readFile(fileName));
closeFile(fileName);
```

터미널 창 →
throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
^
Error: 파일이 존재하지 않습니다. 존재하지 않는 파일..

정확한 위치 정보와 함께 콜스택도 보여줌

---

throw new Error가 아닌 try~ catch~ finally를 이용해 에러를 처리해보자

```tsx
function readFile(fileName: string): string {
  if (fileName === "존재하지 않는 파일") {
    throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
  }
  return "파일을 읽습니다. 📂";
}

function closeFile(fileName: string) {}

const fileName = "존재하지 않는 파일";

try {
  console.log(readFile(fileName));
} catch (e) {
  console.log(`에러를 잡았습니다!`);
} finally {
  closeFile(fileName);
  console.log("finally!");
}

console.log("!!!");
// 이제 try ~ catch ~ finally를 사용할 것이므로 아래 코드를 지워줌
// console.log(readFile(fileName));
closeFile(fileName);
```

예상하지 못한 에러가 발생할 수 있는 함수를 쓸 땐, **에러가 발생할 수 있는 해당 부분**에서만 **try**를 이용해 감싸줌

catch 인자의 이름으로는 e나 error 사용

파일을 읽으려고 했는데 읽지 못한다면

**이전처럼 죽지 않고, 에러 발생을 catch문으로 잡아서**

**정보를 보여주거나 적절한 처리를 하면 됨**

파일을 **읽은 후에는 finally 문에서 닫아줌**

---

### **try ~ catch ~ finally ~**

try가 성공하든 실패하든 (catch 호출 or 호출X) finally는 항상 호출됨

**finally를 생략하면 catch안에서 어떤 일이 일어날 지 모름**

catch안에서 처리할 때 다른 에러가 발생하거나 리턴되는 경우 그 아래의 코드를 실행할 수 없기 때문에

가능하면 try와 연관되어있는, 마지막에 마무리 해야 하는 것이 있다면 finally 안에서 하는 것이 적합함

**finally는 catch 되어도 항상 실행됨을 보장함.**

### 예제 (**finally를 사용해야 하는 이유)**

```tsx
function readFile(fileName: string): string {
  if (fileName === "존재하지 않는 파일") {
    throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
  }
  return "파일을 읽습니다. 📂";
}

function closeFile(fileName: string) {}

function run() {
  const fileName = "존재하지 않는 파일";

  try {
    console.log(readFile(fileName));
  } catch (e) {
    console.log(`에러를 잡았습니다!`);
  }
  // 만약 finally 없이 그냥 closeFile를 호출하면?
  // finally {
  //   closeFile(fileName);
  //   console.log("finally!");
  // }
  closeFile(fileName);
  console.log("파일이 닫혔습니다.");
}
run();

// 에러를 잡았습니다!
// 파일이 닫혔습니다.
```

**캐치문에 return 추가시 캐치문만 실행되고 아래 코드가 실행되지 않음.**

```tsx
function readFile(fileName: string): string {
  if (fileName === "존재하지 않는 파일") {
    throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
  }
  return "파일을 읽습니다. 📂";
}

function closeFile(fileName: string) {}

function run() {
  const fileName = "존재하지 않는 파일";

  try {
    console.log(readFile(fileName));
  } catch (e) {
    console.log(`에러를 잡았습니다!`);
    // return 추가시 캐치문만 실행되고 아래 코드가 실행되지 않음.
    return;
  }
  closeFile(fileName);
  console.log("파일이 닫혔습니다.");
}
run();

// 에러를 잡았습니다!
```

**try와 연관되어 있는, 마지막에 해야할 작업들은 finally 안에 작성한다**

**그리고 try 안에서는 에러가 발생하는 부분만 try로 감싸서 catch, finally 하는 것이 좋다**

### 완성 코드

```tsx
function readFile(fileName: string): string {
  if (fileName === "존재하지 않는 파일") {
    throw new Error(`파일이 존재하지 않습니다. ${fileName}`);
  }
  return "파일을 읽습니다. 📂";
}

function closeFile(fileName: string) {}

function run() {
  const fileName = "존재하지 않는 파일";

  // ** try 안에서는 에러가 발생하는 부분만 try로 감싸서 catch, finally 하는 것이 좋다 **
  try {
    console.log(readFile(fileName));
  } catch (e) {
    console.log(`에러를 잡았습니다!`);
    return;
  } finally {
    closeFile(fileName);
    console.log("파일이 닫혔습니다.");
    // finally 안에 작성시, catch문에서 return 해도 finally 안의 코드가 실행됨.
  }
}
run();
```
