# λ§κ°ν Error State π

### μΈμ  μλ¬λ₯Ό μ°κ³ , Error Stateλ₯Ό μ°λμ§ μμλ³΄κΈ°

μ΄μ  7-3 μμ  μ¬μ©

---

**tryConnect ν¨μμμ μ¬μ©νλ errorμ μ’λ₯κ° λ§λ€λ©΄?**

Error ν΄λμ€λ₯Ό μμλ°λ TimeoutError ν΄λμ€μ

Error ν΄λμ€λ₯Ό μμλ°λ OfflineError ν΄λμ€λ₯Ό λ§λ λ€

try~ catchλ¬Έμμ errorλ any νμ

β if (error instanceof OfflineError) μλ¬κ° OfflineError ν΄λμ€μ μΈμ€ν΄μ€λΌλ©΄ β¦ μ΄λΌλ μ½λλ₯Ό μμ±νκ³  μΆμ§λ§ μ¬μ©ν  μ μμ. μ ?

catchλ‘ errorλ₯Ό λ°λ μκ° any νμμ΄ λμ΄μ, νμμ λν μ λ³΄κ° μ¬λΌμ§κΈ° λλ¬Έ

```tsx
{
  class TimeoutError extends Error {}

  class OfflineError extends Error {}

  class NetWorkClient {
    tryConnect(): void {
      throw new OfflineError("λ€νΈμν¬μ μ°κ²°λμ΄ μμ§ μμ΅λλ€..");
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
        // μλ¬ λ©μμ§λ₯Ό μ μ μκ² λ³΄μ¬μ€
        if (error instanceof OfflineError) {
          //  μ¬μ©ν  μ μμ. μ ? catchλ‘ errorλ₯Ό λ°λ μκ° any νμμ΄ λΌμ, νμμ λν μ λ³΄κ° μ¬λΌμ§κΈ° λλ¬Έ
        }
      }
    }
  }

  const app = new App(service);
  app.run();
  // λ€νΈμν¬μ μ°κ²°λμ΄ μμ§ μμ΅λλ€. λ€νΈμν¬ νμΈ ν μ¬μλνμΈμ.
}
```

### if (error instanceof OfflineError) λ μ¬μ©ν  μ μλ€.

**catchλ‘ errorλ₯Ό λ°λ μκ° any νμμ΄ λΌμ, νμμ λν μ λ³΄κ° μ¬λΌμ§κΈ° λλ¬Έ.**

**exception (μλ¬)λ μμνμ§ λͺ»ν κ³³μμ μ¬μ©**νλ κ²μ΄ λ μ’κ³ 

μ΄λ κ² **μΈλΆμ μΈ κ²μ κ²°μ ν  λλ Error State**λ₯Ό μ¬μ©νλ κ²μ΄ λ μ’λ€

---

**λ€νΈμν¬ μλ¬λ μμν  μ μλ λΆλΆ**

β κ·Έλμ μμν  μ μκ² **throw λ¨λ°μ΄ μλ, ResultStateλ₯Ό λ¦¬ν΄**νλ κ²μ΄ λ μ’λ€

ResultStateλ μ λμ¨ νμ ( μ±κ³΅ μν | μ€ν¨ μν )

μ±κ³΅ μν νμμ κ²°κ³Ό : βμ±κ³΅β

μ€ν¨ μν νμμ κ²°κ³Ό : βμ€ν¨β μ μ μ€ν¨νλμ§ μ μ μλ reasonμ΄ μμ (reasonμ offline | down | timeoutμ΄ μλ μ λμ¨ νμ)

**β μλ¬ νΈλ€λ§ ν  λ μ μ ν μλ¬ λ©μμ§λ₯Ό μ νν΄μ μ¬μ©μμκ² λ³΄μ¬μ£Όκ±°λ, μ¬μλ ν  μ μμ**

νλ‘κ·Έλλ° ν  λ μμν  μ μλ μν (μ±κ³΅, μ€ν¨) λ₯Ό νμμΌλ‘ μ μνλ κ²μ΄ κΉλνκ³  μμ μ , μμ κ°λ₯ν¨

```tsx

 {
  class TimeoutError extends Error {}

  class OfflineError extends Error {}

  type SuccessState = {
    result: "μ±κ³΅";
  };
  type NetWorkErrorState = {
    result: "μ€ν¨";
    reason: "μ€νλΌμΈ" | "μλ² λ€μ΄" | "νμμμ";
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
        // μλ¬ λ©μμ§λ₯Ό μ μ μκ² λ³΄μ¬μ€
        if (error instanceof OfflineError) {
          // μ¬μ©ν  μ μμ. μ ? catchλ‘ errorλ₯Ό λ°λ μκ° any νμμ΄ λΌμ, νμμ λν μ λ³΄κ° μ¬λΌμ§κΈ° λλ¬Έ
          // TypeScriptμμ κ΅¬νλ catch()μλ μ΄λ ν νμ μ λ³΄λ μ λ¬λμ§ μμμ instanceOfλ₯Ό μ¬μ©ν  μ μλ€
        }
      }
    }
  }

  const app = new App(service);
  app.run();
  // λ€νΈμν¬μ μ°κ²°λμ΄ μμ§ μμ΅λλ€. λ€νΈμν¬ νμΈ ν μ¬μλνμΈμ.
}

```

- ?**TypeScriptμμ κ΅¬νλ catch()μλ μ΄λ ν νμ μ λ³΄λ μ λ¬λμ§ μμμ instanceOfλ₯Ό μ¬μ©ν  μ μλ€**
