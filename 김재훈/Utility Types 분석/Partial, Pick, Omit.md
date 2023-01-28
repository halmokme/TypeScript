### 개념

```
interface Profile {
    name: string,
    age: number,
    married: boolean,
}

const jaehoon: Profile = {
    name: 'jaehoon',
    age: 29,
    married: false,
}

// 에러
const newJaehoon: Profile = {
    name: 'jaehoon',
    age: 29,
}

// Partial을 이용하면 name, age, married를 전부 옵셔널로 만들어준다
const newJaehoon2: Partial<Profile> = {
    name: 'jaehoon',
    age: 29,
}

```
사실 partial은 좋은게 아니다. partial때문에 전부 옵셔널되면 아무 것도 안넣어도 되는데 아무것도 안넣는 경우는 거의 없다.
  
그래서 보통 Pick이나 Omit을 쓰는 편


```
interface Profile {
    name: string,
    age: number,
    married: boolean,
}

const jaehoon: Profile = {
    name: 'jaehoon',
    age: 29,
    married: false,
}

// Pick은 가져오고 싶은 것만 선택할 수 있음
const newJaehoon: Partial<Profile, 'name | 'age'> = {
    name: 'jaehoon',
    age: 29,
}

// Omit은 빼고 싶은 것만 선택할 수 있음.
const newJaehoon2: Partial<Profile, 'married'> = {
    name: 'jaehoon',
    age: 29,
}

```

### 직접 구현


#### Partial
```
interface Profile {
    name: string,
    age: number,
    married: boolean,
}
type P<T> = {
    [Key in keyof T]?: T[Key];
}

const newJaehoon: P<Profile> = {
    name: 'jaehoon',
    age: 29,
}
```


#### Pick
```
type P<T, S extends keyof T> = {
    [Key in S]: T[Key];
}

const newJaehoon: P<Profile, 'name' | 'age'> = {
    name: 'jaehoon',
    age: 29,
}
```

#### Omit
```
// Omit은 Pick과 Exclude를 조합하여 만들어냄
 interface Profile {
    name: string,
    age: number,
    married: boolean,
}
type O<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>

const newJaehoon: O<Profile, 'married'> = {
    name: 'jaehoon',
    age: 29,
}
```
