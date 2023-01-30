#### 분석

filter처럼 같은 함수가 여러가지 방법으로 사용되는 경우에는 타입이 여러번 선언되어 있을 수도 있다. 타입을 채워나가며 적당한 것을 찾아서 쓰면 된다

```
interface Array<T> {
    filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[];
    filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[];
}

const filtered = [1,2,3,4,5].filter(el => el % 2);    // 위에꺼 쓰면 됨
const filtered = ['1',2,'3',4,'5'].filter(el => typeof el === 'string'); // 결과가 ['1','3',''5']로 string의 배열이어야 하는데 커서올려보면 (string | number)[]로 타입추론을 제대로 못하고있음.

// filter의 커스텀 타입가드를 참고하여 다음과 같이 바꾸면 타입추론을 제대로 한다.
const predicate = (el: string | number): el is string => typeof el === 'string';
const filtered = ['1',2,'3',4,'5'].filter(predicate);
```

<br />


#### 만들어보기

필터는 어렵다. 타입을 분석하는 것과 만들어내는 것은 수준이 천지차이이므로 연습이 필요하다.
```
interface Arr<T> {
    filter<S extends T>(callback:(el: T) => el is S): S[];
}

const a: Arr<number> = [1,2,3];
const b = a.filter((el): el is number => el % 2 === 0);

const c: Arr<number | string> = ['1',2,'3',4];
const d = c.filter((el): el is string => typeof el === 'string');
const e = c.filter((el): el is number => typeof el === 'number');

// 이런식으로 따로 빼서 쓸 수도 있지만 인라인으로 쓰나 빼서 쓰나 가독성 안좋은건 똑같다. 타입스크립트 쓰려면 감수.
const predicate = ((el: number | string): el is number => typeof el === 'number');
const e = c.filter(predicate);

```
