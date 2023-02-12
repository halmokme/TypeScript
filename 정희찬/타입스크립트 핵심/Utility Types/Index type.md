```tsx
type Animal = {
  name: string;
  age: number;
  gender: "male" | "female";
};

type Name = Animal["name"]; // string 타입
const text: Name = "hello"; // 문자열만 할당이 가능하다.

type Gender = Animal["gender"]; // 'male' | 'female'

// Animal에 있는 모든 타입을 할당할 수 있다.
type Keys = keyof Animal; // 'name' | age | 'gender' 의 타입이 할당됨.
const key: Keys = "gender"; // 'name' | age | 'gender' 의 타입만 할당 가능.

// Animal에서 gender에 접근하여 타입을 할당했다.
type Person = {
  name: string;
  gender: Animal["gender"]; // male | female
};

// Person 타입으로 지정했기 때문에 필수적으로 name, gender가 들어가야한다.
const person: Person = {
  name: "heechan",
  gender: "male",
};
```

**index type**

- 다른 타입에 있는 key에 접근해서 value의 타입을 그대로 다시 선언할 수 있다
