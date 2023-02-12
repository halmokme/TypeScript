### useCallback
원래는 매개변수랑 리턴값이 any로 타이핑이 되어있었는데 18버전에서 더이상 타이핑을 제공해주지 않도록 바뀌었다  
아래 선언부를 보면 Function은 매개변수랑 리턴값이 타이핑이 안되어있다 그러니 타이핑을 해줘야한다.(이벤트 타이핑을 해주면 됨)  
```function useCallback<T extends Function>(callback: T, deps: DependencyList): T;```  


<br />


### useRef
세가지로 선언되어있음
```
function useRef<T>(initialValue: T): MutableRefObject<T>;
function useRef<T>(initialValue: T|null): RefObject<T>;
function useRef<T = undefined>(): MutableRefObject<T | undefined>;
```
셋 중에 누가 걸리느냐가 제일 중요하다. 내가 사용한 ref가 어디 걸리는지 체크해보기.  

mutableRef는 jsx에 연결해주는 용도가 아니라 그 외적 용도(값을 컴포넌트에 저장하고 있는 용도 ...)로 쓸 때.  
그럼 useState를 쓰면 되지 왜 ref를 쓰나? -> seState는 리렌더링 시키는 애고, useRef는 화면을 리렌더링 안시키니까 둘 다 데이터를 저장하는건 맞는데 화면을 리렌더링 시킬거냐 아니냐로 구분해서 사용하기  

특정 태그에 연결해서 쓸 용도라면 RefObject에 걸려야 한다. jsx에 연결할 용도로 ref 만든 경우에는 제네릭과 null을 넣어 다음과 같이 작성한다(이유 설명할 수 있어야 함)
```
const TextInputWithFocusButton = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const onButtonClick = () => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
};
```

타입스크립트는 어떤 요소가 선택될지 모르기 때문에, 우선 초기 값으로 null을 설정한다. 이후 JSX 코드가 실행되면서 선택한 DOM을 가르키게 되는데, 이때 선택될 요소의 타입을 지정함


