### 개념

어떤 함수의 매개변수와 리턴타입을 자유자재로 가져올 수 있음. ```type Params = [number, string, boolean]``` 식으로 하드코딩 안해도 된다

```
// 함수의 매개변수 타입들을 가져오고 싶을때 Parameters
function zip(x: number, y: string, z: boolean): { x: number, y: string, z: boolean} {
    return { x, y, z };
}

type Params = Parameters<typeof zip>    // [x: number, y: string, z: boolean]
type First = Params[0]                  // number


// 함수의 리턴 타입들을 가져오고 싶을때는 ReturnType
type Ret = ReturnType<typeof zip>;      // {x: number, y: string, z: boolean}
type A = Ret['x']                       // number
```

### 분석

#### Parameters
inter는 ts한테 알아서 추론하라는 뜻이며 extends에서만 사용가능하다. ts가 알아서 매개변수 자리를 추론하라는 것.  
추론한 값이 있으면(any) 쓰고 없으면 never

```
// 매개변수의 타입들을 가져오려면 T를 함수로 제한둬야겠지
type P<T extends (...args: any) => any> = T extends (...args: infer A) => any ? A : never;
```


#### ReturnType
```
// Parameters 코드 그대로 infer의 위치만 return으로 가면 되겠지
type R<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;

type Ret = R<typeof zip>       // {x:number, y: string, z: boolean}
```

