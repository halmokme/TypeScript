

#### 분석

함수가 어떻게 돌아가고, 각 자리의 타입이 어떻게 이렇게 되는지 이해하기

```
interface Array<T> {
    forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArgs?: any): void;
}

[1, 2, 3].forEach(el => console.log(el));
['1', '2', '3'].forEach(el => console.log(el));
[123, '1', true].forEach(el => console.log(el));
```

커서 올려보면 타입을 잘 추론해주고 있다. 제네릭은 앞서 학습했듯이 자리만 만들어두고 실제 사용할때 타입이 동적으로 정해진다.

만약 타입추론을 제대로 못해준다면 다음과같이 제네릭에 타입을 알릴 수 있음. 그럼 나머지 제네릭 자리도 다 number로 정해진다
```
function add<T>(x: T, y: T): T { return x }
add<number>(1, 2);
```

<br />


#### 만들어보기

```
interface Arr<T>{
    forEach(callback: (el: T) => void): void;
}

// 검증  
const a: Arr<number> = [1,2,3];
a.forEach(el => el.toFixed(1));

const b: Arr<string> = ['1','2','3'];
b.forEach(el => el.charAt(1));

const c: Arr<string | number> = [1,2,'3'];
c.forEach(el => console.log(el))
```

이정도만 만들어도 훌륭하다. callback의 index, array 자리는 안쓰기 때문에 실제 코드에서 안쓰는것까지 타이핑하기는 너무나 어렵다.  
실제 코드에서 안쓰는건 타이핑 하지 말고, 나중에 혹시나 forEach 쓰다가 두번째 매개변수로 index를 쓰고싶다면 그때그 고치면 된다   
```forEach(callback: (el: T, index: number ) => void): void``` 이런식으로.  
실제 쓰는 코드가 발전함에따라 만들었던 타입도 그때그때 같이 수정해나가는거지, 처음부터 모든걸 예상하고 완벽하게 만들어두기는 어렵다.
