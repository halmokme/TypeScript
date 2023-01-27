
#### 분석

```
interface Array<T> {
    map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}

const string = [1,2,3].map(el => el.toString());  // ['1','2','3'] string[]
const string = [1,2,3].map(el => el + 1);        // [2,3,4] number[]

```  
T는 number, U는 callbackfn의 리턴값의 타입인데 toString이므로 당연히 string. 따라서 맵함수 전체의 리턴값은(맨마지막U) string이 되는 것.  
남이 타이핑해둔걸 읽기 힘든 이유가 가독성이 안좋기 때문. 매개변수 타이핑이 길게 들어가서 헷갈리는데 (callbackfn, thisArg) 이렇게 보면 별거아니다. 차분하게 하다보면 왜 최종타입이 저렇게 추론되었는지 알수있다


<br />

#### 만들어보기
```
interface Arr<T>{
    map<S>(callback:(el: T) => S): S[];
}

// 검증
const a: Arr<number> = [1,2,3];
const b = a.map(el => el + 1);
const c = a.map(el => el.toString());
const d = a.map(el => el % 2 === 0);

const e: Arr<string> = ['1','2','3'];
const f = e.map(el => +el);
```
