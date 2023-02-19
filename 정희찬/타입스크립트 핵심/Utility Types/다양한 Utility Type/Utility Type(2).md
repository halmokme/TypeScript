## Omit Type, Record

### Omit Type

- pick와 반대의 기능을 한다.
  - K extends keyof any 이기 때문에 K에서 없는 타입도 선언은 가능하다.

```tsx
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

- **K extends keyof any**

```tsx
{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

	// Video에 없는 타입도 지정이 가능하다.
  type VideoMetadata = Omit<Video, "url" | "data" | "good">;
	...
}
```

- **Pick<T, Exclude<keyof T, K>>;**
  - **Exclude** : U가 T안에 들어있다면 그 타입은 사용하지 않고 없으면 사용한다.

```tsx
// U가 T안에 들어있다면 그 타입은 사용하지 않고 없으면 사용한다.
type Exclude<T, U> = T extends U ? never : T;
```

- **예제**
  - pick과는 반대로 동작

```tsx
{
  type Video = {
    id: string;
    title: string;
    url: string;
    data: string;
  };

  type VideoMetadata = Omit<Video, "url" | "data">;

  function getVideo(id: string): Video {
    return {
      id,
      title: "video",
      url: "https://...",
      data: "byte-data...",
    };
  }

  function getVideoMetadata(id: string): VideoMetadata {
    return {
      id: id,
      title: "title",
    };
  }
}
```

### Record

- 하나의 타입과 다른 타입을 묶을 경우 사용한다.

```tsx
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

- **예제**
  - Page를 key로 삼고 PageInfo를 value로 삼게 된다.
  - Page의 타입들을 Key로 지정
  - 각 Key마다 Value의 타입은 title: string 으로 정해진다.

```tsx
type PageInfo = {
  title: string;
};

type Page = "home" | "about" | "contact";

// Page와 PageInfo를 묶어주는 방법
const nav: Record<Page, PageInfo> = {
  home: { title: "Home" },
  about: { title: "About" },
  contact: { title: "Contact" },
};
```
