Array;
[1, 2].map

Array에 cmd를 누르고 클릭하면 타입스크립트가 설치되면 자동으로 오는 파일들이 있다.
그 중 d는 ? => 타입이 정의된 것
js 라이브러리 사용해야 할 때 js 언어 자체에서 제공하는 Array.. DOM API ...등 사용 시
타입 정보가 없는 js 만 사용하면 힘드니까, 명확하게 타입이 어떤 것인지 확인할 수 있도록 한 파일

### Array API 문서

[https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts](https://github.com/microsoft/TypeScript/blob/master/lib/lib.es5.d.ts)

API를 읽으면서 타입스크립트 깊게 이해하기

- 코멘트를 읽어보고 어떤 인자가 필요한지 정확하게 확인하기

```tsx
interface ConcatArray<T> {
  readonly length: number;
  readonly [n: number]: T;
  // [n : number] : T 는 배열에서 인덱스로 아이템을 접근하는 것과 같음. ex) array[1]로 접근할 때 리턴되는 값은 배열의 아이템인 T타입.
  join(separator?: string): string;
  slice(start?: number, end?: number): T[];
}
```

---

### interface Array<T>

- 인터페이스이다, Array 인터페이스를 구현한 클래스가 따로 있음
  인터페이스 = 규격사항 → 인터페이스 내에 정의된 함수만 사용할 수 있음
- 제네릭이다, 원하는 대로 정의해서 사용 가능

### toString, toLocaleString

```tsx
toString(): string;

toLocaleString(): string;
```

toString : 배열을 문자열(string)로 변환한다

toLocaleString : 배열을 문자열로 + 배열의 모든 요소들도 각각의 toLocaleString을 호출, 각각 string으로 변환한다

toString과 toLocaleString은 object에 기본적으로 들어있는 함수

### pop

```tsx
pop(): T | undefined;
```

Array<T> , 즉 배열이 T로 정의되어져 있으므로

T타입 데이터를 변환하거나 undefined를 리턴함

배열 제일 마지막 요소를 꺼내옴, 배열이 비어있다면 undefined 리턴

### push

```tsx
push(...items: T[]): number;
```

…items : 원하는 개수만큼

인자를 T타입으로 전달 : 숫자 타입이 리턴됨

추가하는 아이템이 더해진 최종 배열의 숫자

### concat

```tsx

    concat(...items: ConcatArray<T>[]): T[];
	// ConcatArray 데이터 타입의 배열을 스프레드 연산자를 이용, 원하는 개수만큼 받음

    concat(...items: (T | ConcatArray<T>)[]): T[];
	// T 타입의 아이템이거나, ConcatArray 타입의 아이템을 스프레드 연산자로 받아옴

```

동일한 이름의 두가지 다른 타입의 인자를 받는 함수 : **오버로딩 함수**
전달되는 인자 타입에 따라 호출되는 함수가 달라짐

### join

```tsx
   join(separator?: string): string;
```

구분자(문자열)를 전달해도 되고, 전달하지 않아도 됨 (옵셔널 ?:)

따로 전달하지 않으면 ,로 전달됨

### reverse

```tsx
reverse(): T[];
```

배열의 순서를 거꾸로 만들어줌

거꾸로 만든 뒤 다시 배열을 리턴

### slice

```tsx
slice(start?: number, end?: number): T[];
```

start?: end?: 는 옵셔널,

배열 형태로 리턴

### shift

```tsx
/**
     * Removes the first element from an array and returns it.
     * If the array is empty, undefined is returned and the array is not modified.
     */
    shift(): T | undefined;
```

배열 앞 부분을 제거하고 T 아이템 하나를 빼서 전달하거나

아이템이 비어져있다면 undefined를 리턴

### **sort**

````tsx
/**
     * Sorts an array in place.
     * This method mutates the array and returns a reference to the same array.
     * @param compareFn Function used to determine the order of the elements. It is expected to return
     * a negative value if the first argument is less than the second argument, zero if they're equal, and a positive
     * value otherwise. If omitted, the elements are sorted in ascending, ASCII character order.
     * ```ts
     * [11,2,22,1].sort((a, b) => a - b)
     * ```
     */
    sort(compareFn?: (a: T, b: T) => number): this;
````

**콜백함수를 전달**

콜백함수는 옵셔널, **전달하지 않으면 ascending으로 자동 정렬**됨.

정렬하고 싶은 로직이 있으면 콜백함수를 통해 정렬시킴

콜백함수 받아서 숫자가 1인지, 0인지, -1를 기반으로 sorting함

---

this 타입을 리턴한다는 것은

그 클래스, 자기 자신을 리턴한다와 동일

array.sort() -> 리턴값은 정렬된 아이템들을 담고 있는 array 자신

### **every**

```tsx
		/**
     * Determines whether all the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
		// 첫번째 예제 : 타입을 확인하고 싶을 때 이용하는 오버로딩 함수

    /**
     * Determines whether all the members of an array satisfy the specified test.
     * @param predicate A function that accepts up to three arguments. The every method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value false, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
		// 두번째 예제 : 어떤 것을 확인하는 경우 사용하는 오버로딩 함수

```

모든 요소들이 위 함수에 부합해야 함

### every의 첫번째 예제

```tsx
every<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): this is S[];
// 첫번째 예제. **타입을 확인**하고 싶을 때 이용하는 오버로딩 함수
```

S 타입은 배열에서 지정된 T 타입을 상속하는 서브 타입

predicate는 배열의 모든 요소를 돌면서,

각각의 아이템들은 T 타입 (배열)

value가 S타입인지 아닌지 확인함

value 안에 있는 것이 S타입이라면, true

마지막에도 해당 배열이 S타입인지 아닌지 확인함 (this is S[])

- **value is S가 무엇인가**

value is S는 타입스크립트에 **타입 확인을 위한 함수를 만들때 사용할 수 있는 문법**

```tsx
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

**함수 정의를 보면,** 인자로 Fish나 Bird 타입 두가지를 가질 수 있는 값을 전달하면

함수에서 Fish 타입일 경우에만 true로 전달한다 → 타입스크립트에서 자동적으로 pet이 Fish임을 알 수 있음
나머지 경우는 Bird인 것을 알 수 있다

- **is type~이 무엇인가**

특정한 키가 해당하는 오브젝트 안에 있는지 없는지 검사,

**as :** 타입 assertion

**type predicates :** 사용자가 타입 결정

pet이 Fish일 경우에만, Fish라는 타입을 보장해주는 함수 정의

**every 사용 예제**

console.log(animals.every<Cat>(isCat));을 입력하면

false

로 뜨는 것을 확인할 수 있다 → 배열 안에 Dog도 있기 때문.

```tsx
class Animal {}
class Cat extends Animal {
  isCat: boolean = true;
}
class Dog extends Animal {
  isDog: boolean = true;
}

const animals: Animal[] = [new Cat(), new Dog(), new Cat()];

function isCat(animal: Animal): animal is Cat {
  // animal이 Cat일 경우에만. Cat 타입을 보장해주는 함수
  return (animal as Cat).isCat !== undefined; // as는 타입 assertion
}

animals.every<Cat>(isCat);

console.log(animals.every<Cat>(isCat));
```

### every의 두번째 예제

```tsx
// 두번째 예제. 어떤 것을 확인하는 경우 사용하는 오버로딩 함수
every(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
```

첫번째 인자 : 콜백 함수 / 두번째 인자 : thisArg

predicate : 세 가지를 인자로 받는, 시험하는 콜백 함수,

함수는 매번 호출됨. 배열에 있는 모든 것에 대해 호출됨.

predicate가
인자로는 value(배열 각각의 아이템), index, array(배열 전체)가 들어옴
리턴 되는 타입은 알 수 없는 unKnown

**배열에 있는 모든 아이템이 콜백함수를 만족하는지 확인**

배열에 있는 모든 것에 대해 함수는 매번 호출됨.

predicate가 한 번이라도 false 값을 리턴하면 멈춤

→ false 값을 가질 수 있는 데이터 : 0, ‘ ‘, null, undefined

리턴된 값이 위 false에 해당하면, 함수를 호출하지 않고 false를 리턴.

true인 경우 배열 전체를 만족할 때까지 돈다

thisArg : 전달된 콜백 함수에서 this를 참고하면. **this가 thisArg 오브젝트를 가리킬 수 있게 전달 가능**

**every 사용 예제**

```tsx
type Student = {
  passed: boolean;
};

const students: Student[] = [
  { passed: true },
  { passed: true },
  { passed: true },
];
const result = students.every((student) => {
  return student.passed;
});
console.log(result); // 로그: true
```

모두 true여야 true 출력

```tsx
type Student = {
  passed: boolean;
};

const students: Student[] = [
  { passed: true },
  { passed: true },
  { passed: false },
];
const result = students.every((student) => {
  return student.passed;
});
console.log(result); // 로그: false
```

하나라도 false면 false 출력

---

### **some**

```tsx
/**
     * Determines whether the specified callback function returns true for any element of an array.
     * @param predicate A function that accepts up to three arguments. The some method calls
     * the predicate function for each element in the array until the predicate returns a value
     * which is coercible to the Boolean value true, or until the end of the array.
     * @param thisArg An object to which the this keyword can refer in the predicate function.
     * If thisArg is omitted, undefined is used as the this value.
     */
    some(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): boolean;
```

every : 모든 요소들이 부합해야 함

some : 하나라도 만족하면 true를 리턴
