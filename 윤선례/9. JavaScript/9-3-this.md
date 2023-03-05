# 객체지향 언어와 자바스크립트에서의 this

**객체지향 언어**에서의 **this** : **메서드를 호출한 객체** (클래스 자신, 만들어진 객체)

**JS**에서의 **this** : **함수를 호출할 때 함수가 속한 객체** (누가 호출했는지에 따라 달라짐)

<br>

```tsx
let person1 = {
  firstName: "John",
  lastName: "Doe",
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};

let person2 = {
  firstName: "Jane",
  lastName: "Doe",
  fullName: person1.fullName,
};
```

자바스크립트에서 this는 호출한 함수가 속한 객체를 가리키므로,

위와 같은 코드에서

person1.fullName()을 호출하면 this는 person1을,

person2.fullName()을 호출하면 this는 person2를 가리키게 된다

호출한 문맥에 따라 this가 동적으로 변경되는 형태

this는 객체지향 언어와 JS에서 서로 다른 의미를 가지고 있어, 잘 구분해서 사용해야 한다.
