### 개념
```
interface Profile {
    name?: string,
    age?: number,
    married?: boolean,
}

// optional로 타이핑 해놓은 것을 전부 필수로 만들고 싶을때 Required
const jaehoon: Required<Profile> = {
    name: 'jaehoon',
    age: 29,
    married: false,
}

// 수정을 못하게 막고싶다면 Readonly
const jaehoon2: Readonly<Profile> = {
    name: 'jaehoon',
    age: 29,
    married: false,
}
jaehoon2.name = 'hoon';    // 에러

```


### 분석

#### Required
```
// 옵셔널 앞에 마이너스가 붙으면 옵셔널을 제거하는 것. 아래 코드는 키를 가져올때 옵셔널을 떼고 가져오라는 의미
type R<T> = {
    [key in keyof T]-?: T[key];
}
```

#### Readonly
```
type R<T> = {
    readonly [key in keyof T]: T[key];
}
```

<br />

readonly 앞에 -를 붙일 수도 있다. 이미 readonly로 되어있는 코드를 수정도 가능하게 바꾸고 싶을때.  
아래 코드는 옵셔널도 떼고 readonly도 떼고
```
interface Profile {
    readonly name?: string,
    readonly age?: number,
    readonly married?: boolean,
}

type R<T> = {
    -readonly [key in keyof T]-?: T[key];
}

const jashoon: R<Profile> {
    name: 'jaehoon',
    age: 29,
    married: false,
}
jaehoon.name = 'hoon'   // readonly로 선언되어 있지만 정상적으로 값이 바뀜

```
