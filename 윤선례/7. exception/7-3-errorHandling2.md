# 우아하게 에러를 처리하는 방법

### 네트워크 클라이언트를 예제로 에러 처리에 대해 알아보기

```tsx
class NetWorkClient {
  tryConnect(): void {
    throw new Error("네트워크에 연결되어 있지 않습니다..");
  }
}

class UserService {
  constructor(private client: NetWorkClient) {}
  // 클래스의 프로퍼티로 만들기 위해 private 붙임
  // 생성자로 Dependency Injection(의존성 주입)사용, NetworkClient 클래스를 받아옴
  login() {
    this.client.tryConnect();
  }
}

const client = new NetWorkClient();
const service = new UserService(client);
service.login();
```

**Dependency Injection(의존성 주입)**

외부에서 만들어진 인스턴스를 생성자에 인자로 주입 받아서 쓰기 때문에

필요한 것들이 (의존하는 Dependency)가 외부로 부터 주입(injection)된 것

service.login() 실행시 에러 발생 - 로그 출력 없이 뻗음

이런 경우 어떻게 하면 될까?

---

다른 추가 예제. 에러 로그 확인시, **어떤 순서로 호출되어지는지 확인 가능**

### 어디에서 try~ catch로 에러 핸들링 하는 것이 좋을까?

```tsx
class NetWorkClient {
  tryConnect(): void {
    throw new Error("네트워크에 연결되어 있지 않습니다..");
  }
}

class UserService {
  constructor(private client: NetWorkClient) {} // 클래스의 프로퍼티로 만들기 위해 private 붙임
  login() {
    this.client.tryConnect();
  }
}

const client = new NetWorkClient();
const service = new UserService(client);
// service.login();

class App {
  constructor(private service: UserService) {}
  run(): void {
    this.service.login();
  }
}

const app = new App(service);
app.run();
```

---

### 처음으로 쓰는 곳인 login 안의 함수에서 시도 해보면..

```tsx
class NetWorkClient {
  tryConnect(): void {
    throw new Error("네트워크에 연결되어 있지 않습니다..");
  }
}

class UserService {
  constructor(private client: NetWorkClient) {} // 클래스의 프로퍼티로 만들기 위해 private 붙임
  login() {
    try {
      this.client.tryConnect();
    } catch (e) {
      console.log("에러 잡았당");
      // 어플리케이션이 죽지 않고, 로그로 출력할 수 있게 tryConnect 실패 시 에러메시지를 catch로 출력
      // 그러나 잡은 에러로 의미있게 할 수 있는 일? 없음
      // 에러가 발생했을 떄 정확하게 처리할 수 있는 것이 아니라면, catch 하지 않는 것이 낫다
      // 그래서 여기서 잡기보단, 처리할 수 있는 곳에서 try 하는 것이 더 좋음
    }
  }
}

const client = new NetWorkClient();
const service = new UserService(client);
service.login();

class App {
  constructor(private service: UserService) {}
  run(): void {
    this.service.login();
  }
}

const app = new App(service);
app.run();
```

login 안에서 try~ catch를 시도하면 의미있게 에러를 처리할 수 없음

**해당 에러를 처리할 수 있는 곳**인 App 레벨에서 처리하는 것이 더 낫다

### 에러 처리하기

에러를 정확하게 처리할 수 있는 App에서 처리하는 코드

```tsx
class NetWorkClient {
  tryConnect(): void {
    throw new Error("네트워크에 연결되어 있지 않습니다..");
  }
}

class UserService {
  constructor(private client: NetWorkClient) {} // 클래스의 프로퍼티로 만들기 위해 private 붙임
  login() {
    this.client.tryConnect();
  }
}

const client = new NetWorkClient();
const service = new UserService(client);

class App {
  constructor(private userService: UserService) {}
  run(): void {
    try {
      this.userService.login();
    } catch (e) {
      // 로그인 try후 에러 발생 시, catch문에서 다이얼로그를 사용자에게 보여줄 수 있음
      console.log(
        "네트워크에 연결되어 있지 않습니다. 네트워크 확인 후 재시도하세요."
      );
    }
  }
}

const app = new App(service);
app.run();
// 네트워크에 연결되어 있지 않습니다. 네트워크 확인 후 재시도하세요.
```

### **try~ catch문을 어디에 작성해야 할까?**

1. 예외 처리는 반드시 필요한 경우에만 사용
2. 예외가 발생한 지점에서 최대한 빨리 처리
3. 예외 처리 코드는 최소화 (가독성 낮출 수 있기 때문)
4. **예외 처리 코드는 로그에 기록 (추후 디버깅에 유용)**
