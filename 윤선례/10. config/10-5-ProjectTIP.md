# 어떤 순서로 해나갈 건지 계획하기

1. 어떤 기능들이 있는지 명확하게 정의하고 생각
2. 잘 다듬어진 로드맵으로, 여러가지 마일스톤(단계)으로 **나누어서** 생각

   각 단계가 끝날 때마다 그 자체만으로 배포 가능, 사용자가 사용 가능한 단계로 나누어서 만들어야 한다.

# useState 사용 시 제네릭

```tsx
type Information = { name: string; description: string };
const [info, setInformation] = useState<Information | null>(null);
```

useState 사용 시 제네릭을 사용하는 것은, 상태가 null일 수도 있고 아닐 수도 있을 때 사용한다.

# 인풋 상태 관리

```tsx
import React, { useState } from "react";

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const { name, description } = form;

  const onChange = (e: any) => {
    // e 값을 무엇으로 설정해야할까요?
  };

  const handleSubmit = (e: any) => {
    // 여기도 모르니까 any 로 하겠습니다.
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
```

인풋 상태 관리는

위 코드의 onChange에 마우스를 올렸을 때

React.ChangeEventHandler<HTMLInputElement>가 나타남

위 코드의 타입을 가져오면 된다

```tsx
// MyForm.tsx
import React, { useState } from "react";

type MyFormProps = {
  onSubmit: (form: { name: string; description: string }) => void;
};

function MyForm({ onSubmit }: MyFormProps) {
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const { name, description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e 값은 onChange에 마우스 올렸을 때 나오는 React.ChangeEvent<HTMLInputElement>로 설정
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e 값은 onChange에 마우스 올렸을 때 나오는 React.FormEventHandler<HTMLFormElement> -> React.FormEvent<HTMLFormElement>로 설정
    e.preventDefault();
    onSubmit(form);
    setForm({
      name: "",
      description: "",
      // 초기화
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={description} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  );
}

export default MyForm;
```

```tsx
// App.tsx
import React from "react";
import Greetings from "./Greetings";
import Counter from "./Counter";
import MyForm from "./MyForm";

const App: React.FC = () => {
  const onSubmit = (form: { name: string; description: string }) => {
    console.log(form);
  };
  return <MyForm onSubmit={onSubmit} />;
};

export default App;
```

# 타입스크립트에서 React.FC 를 사용 할 때의 이점

1. 반환 타입을 명시적으로 지정할 수 있습니다.
   **`React.FC`** 는 제네릭 타입으로 **`props`** 를 받습니다. 이를 활용하여 함수형 컴포넌트의 반환 타입을 명시적으로 지정할 수 있습니다. 예를 들어, **`React.FC<Props>`** 로 타입을 지정하면 반환 값이 **`JSX.Element`** 임을 알 수 있습니다.
2. **`children`** props가 기본적으로 포함됩니다.
   **`React.FC`** 를 사용하면 **`children`** 이라는 props가 기본적으로 포함됩니다. 이는 함수형 컴포넌트에서 자식 컴포넌트를 포함하는 경우 유용합니다.
3. defaultProps와 propTypes를 정의하기 쉬워집니다.
   **`React.FC`** 를 사용하면 **`defaultProps`** 와 **`propTypes`** 를 정의하기 쉬워집니다. **`defaultProps`** 는 **`React.FC.defaultProps`** 로, **`propTypes`** 는 **`React.FC.propTypes`** 로 간단히 정의할 수 있습니다.
4. **`React.SFC`** 보다 명시적입니다.
   **`React.SFC`** 는 이제 더 이상 사용되지 않는데, **`React.FC`** 를 사용하면 **`React.SFC`** 보다 더 명시적인 타입을 사용할 수 있습니다.

따라서, **`React.FC`** 를 사용하면 함수형 컴포넌트를 작성하는 것이 더 명시적이고 타입 안정성이 높아집니다.
