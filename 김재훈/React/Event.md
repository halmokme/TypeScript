*** Event
리액트의 이벤트 시스템을 사용한다. 때문에 이벤트를 다룰 때는 React 버전의 이벤트를 구체적으로 지정해야 한다.

1. onClick  
```const handleClick = (event: React.MouseEvent<HtmlButtonElement>) => { ~~~ }```

2. Form  
```const handleSubmit = (event: React.FormEvent<HtmlFormElement>) => { ~~~ }```

3. onChange  
```const handleChange = (event: React.ChangeEvent<HtmlInputElement>) => { ~~~ }```

이외에도 다양한 이벤트가 존재한다
