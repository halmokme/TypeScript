## ReadOnly, Partial Type, Pick

### ReadOnly - Readonly<T>

- ReadOnly 메서드 형태

```tsx
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

**예제**

- 불변성이 지켜지지 않은 상태

```tsx
{
  type ToDo = {
    title: string;
    description: string;
  };

  // 그저 보여주기만 하는 function
  function display(todo: ToDo) {
    // 하지만 이런식으로 변하지 말아야 할 값을 변경할 수 있다.
    // 불변성을 유지해야할 경우 readonly를 사용한다
    todo.title = "jaja";
  }
}
```

- **불변성을 지키는 방법 -** Readonly<T> 로 타입 지정을 한다.

```tsx
{
  type ToDo = {
    title: string;
    description: string;
  };

  // 그저 보여주기만 하는 function
  function display(todo: Readonly<ToDo>) {
    // 하지만 이런식으로 변하지 말아야 할 값을 변경할 수 있다.
    // 불변성을 유지해야할 경우 readonly를 사용한다
    todo.title = "jaja";
  }
}
```

- 기본적인 타입은 모두 지정되어 있다.
  **- lib.es5.d.ts 에 입력되어 있음(Utility class가 정의 되어있음.)**

```tsx
function display(todo: Readonly<ToDo>) {
  todo.title = "jaja"; // error 남.
}
```

### Partial Type

- 부분적으로 타입을 변경할때 사용한다
- Partial 메서드의 형태

```tsx
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

- **예제**
  - ToDo를 업데이트하여 업데이트된 ToDo를 return 하는 함수

```tsx
{
  type ToDo = {
    title: string;
    description: string;
    label: string;
    priority: "high" | "low";
  };

  // ToDo를 업데이트하여 업데이트된 ToDo를 return하는 함수
  function updateTodo(todo: ToDo, fieldsToUpdate: Partial<ToDo>): ToDo {
    return { ...todo, ...fieldsToUpdate };
  }

  const todo: ToDo = {
    title: "TypeScript",
    description: "study partial",
    label: "study",
    priority: "high",
  };

  const update = updateTodo(todo, { priority: "low" });
  console.log(update);
}
```

**출력값**

```tsx
{
  title: 'TypeScript',
  description: 'study partial',
  label: 'study',
  priority: 'low'
}
```

- priority 의 값이 변경되었다.

### Pick

- Pick 메서드의 형태

```
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

- **예제**
  - 선언된 타입에서 타입을 골라 타입을 지정할 수 있음
  - 기존 타입에서 원하는 타입을 골라서 제한된 타입으로 만들어 사용할 수 있다.

```tsx
{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  function getVideo(id: string): Video {
    return {
      id,
      title: "video",
      url: "https://...",
      data: "byte-data...",
    };
  }

  function getVideoMetadata(id: string): Pick<Video, "id" | "title"> {
    return {
      id: id,
      title: "title",
    };
  }
}
```

- 개선된 코드

```tsx
{
  ...

  type VideoMetadata = Pick<Video, "id" | "title">;

	...

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id: id,
      title: "title",
    };
  }
}
```
