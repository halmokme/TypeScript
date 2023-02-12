### getter? setter?

```tsx
{
  class User {
    firstName: string;
    lastName: string;
    fullName: string;
    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = `${firstName} ${lastName}`;
    }
  }
  const user = new User("Steve", "jobs");
  console.log(user.fullName); // 출력 : Steve jobs

  // firstName 을 변경 시도
  // fullName이 지정된 상태로 유지됨.
  user.firstName = "jeong";
  console.log(user.fullName); // 출력 : Steve jobs
}
```

- firstName 을 변경 시도했으나 fullName이 지정된 상태로 유지된다.
  - firstName이나 lastName이 다시 할당되도 fullName은 변경되지 않는다.

### getter 사용방법

- get 사용시 해당 fullName에 접근 할때마다 새로운 데이터를 생성할 수 있다.
- 함수처럼 선언 하지만 접근할때는 멤버변수에 접근하는 것 처럼 작성해야한다.
- user.fullName

```tsx
{
  class User {
    // get 사용시 해당 fullName에 접근 할때마다 새로운 데이터를 생성할 수 있다.
    // 함수처럼 선언 하지만 접근할때는 멤버변수에 접근하는 것 처럼 작성해야한다. - user.fullName
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    constructor(public firstName: string, public lastName: string) {}
  }
  const user = new User("Steve", "jobs");
  console.log(user.fullName); // 출력 : Steve jobs

  user.firstName = "jeong";
  console.log(user.fullName); // 출력 : Steve jobs
}
```

### setter 사용방법

- set을 통해 전달받은 private으로 선언된 멤버변수를 설정할 수 있다.
- 유효성 검사도 진행할 수 있다.

```tsx
{
  class User {
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    private interalAge = 4;
    get age(): number {
      return this.interalAge;
    }

    // set을 통해 전달받은 private으로 선언된 멤버변수를 설정할 수 있다.
    // 유효성 검사도 진행할 수 있다.
    set age(num: number) {
      if (num < 0) {
        throw new Error("value for ages should be greater than 0");
      }
      this.interalAge = num;
    }

    constructor(private firstName: string, private lastName: string) {}
  }
  const user = new User("Steve", "jobs");

  console.log(user.age); // 출력 : 4
  user.age = 6; // setter를 호출하게 되고 전달한 데이터를 할당한다.
  console.log(user.age); // 출력 : 6
}
```

### 클래스 짧게 만들기

- 아래 두 코드는 같은 코드이다.

```tsx
class User {
  private firstName: string;
  private lastName: string;

  // get 사용시 해당 fullName에 접근 할때마다 새로운 데이터를 생성할 수 있다.
  // 함수처럼 선언 하지만 접근할때는 멤버변수에 접근하는 것 처럼 작성해야한다. - user.fullName
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(firstName: string, lastName: string) {}
}
```

```tsx
class User {
  // private firstName: string;
  // private lastName: string;

  // get 사용시 해당 fullName에 접근 할때마다 새로운 데이터를 생성할 수 있다.
  // 함수처럼 선언 하지만 접근할때는 멤버변수에 접근하는 것 처럼 작성해야한다. - user.fullName
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(private firstName: string, private lastName: string) {}
}
```
