### useState

선언부를 보면 알 수 있지만 initialState에 함수를 넣을 수 있다.  

```function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>]; 

엄청 복잡한 함수일때 리렌더링될때 매번 호출되면 성능이 느려지므로 한번만 호출하면서도 초기값 쓸 수 있게 할 때 사용한다

const [word, setWord] = useState(() => {
    return 복잡한 함수();
})
```


참고 : https://yceffort.kr/2020/10/IIFE-on-use-state-of-react

* 가끔 setState에 await 붙이는 사람들이 있는데 안됨. async await은 함수 타이핑 추론된걸 보았을때 리턴값이 Promise인 경우에 그때 await 붙이면 된다. Promise 아니어도 붙일 수 있긴 한데 아무 의미가 없다. axios get을 보면 Promise 확인가능



### useEffect

```
  useEffect(async () => {
    await axios.post()
  }, [])
```
이런 방식이 JS에서는 되는데 TS에서는 문제가 된다. 왜냐면 useEffect의 EffectCallback 부분 리턴값 타이핑이 void로 고정되어 있으므로 async를 쓸 수가 없다(async 함수에서 리턴한 것은 무조건 프로미스로 감싸지므로)   
 ```function useEffect(effect: EffectCallback, deps?: DependencyList): void;```

아래 함수는 오류가 나는데, 오류메세지를 보면 Promise<string> 형식의 인수는 EffectCallback 형식의 매개변수에 할당할 수 없다고 나온다. 에러메세지를 보고 이해하도록
```
  useEffect(async () => {
    return '3'
  }, [])
```

그래서 타입스크립트에서는 다음과 같은 코딩이 강제됨  
```
  useEffect(() => {
    const func = async () => {
      await axios.get('/');
    }
    func();
  }, [])
```
