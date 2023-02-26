# 막강한 Error State 👍

### 언제 에러를 쓰고, Error State를 쓰는지 알아보기

이전 7-3 예제 사용

---

**tryConnect 함수에서 사용하는 error의 종류가 많다면?**

Error 클래스를 상속받는 TimeoutError 클래스와

Error 클래스를 상속받는 OfflineError 클래스를 만든다

try~ catch문에서 error는 any 타입

→ if (error instanceof OfflineError) 에러가 OfflineError 클래스의 인스턴스라면 … 이라는 코드를 작성하고 싶지만 사용할 수 없음. 왜 ?

catch로 error를 받는 순간 any 타입이 되어서, 타입에 대한 정보가 사라지기 때문

```tsx
{
  class TimeoutError extends Error {}

  class OfflineError extends Error {}

  class NetWorkClient {
    tryConnect(): void {
      throw new OfflineError("네트워크에 연결되어 있지 않습니다..");
    }
  }

  class UserService {
    constructor(private client: NetWorkClient) {}
    login() {
      this.client.tryConnect();
    }
  }

  type Error = {};

  const client = new NetWorkClient();
  const service = new UserService(client);

  class App {
    constructor(private userService: UserService) {}
    run(): void {
      try {
        this.userService.login();
      } catch (error) {
        // 에러 메시지를 유저에게 보여줌
        if (error instanceof OfflineError) {
          //  사용할 수 없음. 왜 ? catch로 error를 받는 순간 any 타입이 돼서, 타입에 대한 정보가 사라지기 때문
        }
      }
    }
  }

  const app = new App(service);
  app.run();
  // 네트워크에 연결되어 있지 않습니다. 네트워크 확인 후 재시도하세요.
}
```

### if (error instanceof OfflineError) 는 사용할 수 없다.

**catch로 error를 받는 순간 any 타입이 돼서, 타입에 대한 정보가 사라지기 때문.**

**exception (에러)는 예상하지 못한 곳에서 사용**하는 것이 더 좋고

이렇게 **세부적인 것을 결정할 때는 Error State**를 사용하는 것이 더 좋다

---

**네트워크 에러는 예상할 수 있는 부분**

→ 그래서 예상할 수 없게 **throw 남발이 아닌, ResultState를 리턴**하는 것이 더 좋다

ResultState는 유니온 타입 ( 성공 상태 | 실패 상태 )

성공 상태 타입은 결과 : ‘성공’

실패 상태 타입은 결과 : ‘실패’ 와 왜 실패했는지 알 수 있는 reason이 있음 (reason은 offline | down | timeout이 있는 유니온 타입)

**→ 에러 핸들링 할 때 적절한 에러 메시지를 선택해서 사용자에게 보여주거나, 재시도 할 수 있음**

프로그래밍 할 때 예상할 수 있는 상태 (성공, 실패) 를 타입으로 정의하는 것이 깔끔하고 안정적, 예상 가능함

```tsx

 {
  class TimeoutError extends Error {}

  class OfflineError extends Error {}

  type SuccessState = {
    result: "성공";
  };
  type NetWorkErrorState = {
    result: "실패";
    reason: "오프라인" | "서버 다운" | "타임아웃";
  };
  type ResultState = SuccessState | NetWorkErrorState;
  class NetWorkClient {
    tryConnect(): ResultState {}
  }

  class UserService {
    constructor(private client: NetWorkClient) {}
    login() {
      this.client.tryConnect();
    }
  }

  type Error = {};

  const client = new NetWorkClient();
  const service = new UserService(client);

  class App {
    constructor(private userService: UserService) {}
    run(): void {
      try {
        this.userService.login();
      } catch (error) {
        // 에러 메시지를 유저에게 보여줌
        if (error instanceof OfflineError) {
          // 사용할 수 없음. 왜 ? catch로 error를 받는 순간 any 타입이 돼서, 타입에 대한 정보가 사라지기 때문
          // TypeScript에서 구현된 catch()에는 어떠한 타입 정보도 전달되지 않아서 instanceOf를 사용할 수 없다
        }
      }
    }
  }

  const app = new App(service);
  app.run();
  // 네트워크에 연결되어 있지 않습니다. 네트워크 확인 후 재시도하세요.
}

```

- ?**TypeScript에서 구현된 catch()에는 어떠한 타입 정보도 전달되지 않아서 instanceOf를 사용할 수 없다**
