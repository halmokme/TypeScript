### 개념

클래스의 생성자 타입과, 인스턴스 타입을 자유자재로 가져올 수 있음
```
class A {
    a: string;
    b: number;
    c: boolean;
    constructor(a: string, b: number, c: boolean) {
        this.a = a;
        this.b = b;
        this.c = c;
    }
}
const c = new A('a', 1, true);

// 생성자 타입 얻어오기
type C = ConstructorParameters<typeof A>;

// 인스턴스 타입 얻어오기
type I = InstanceType<typeof A>;

```

### 분석
```
// ConstructorParameters
type C<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;

// InstanceType
type I<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any;
```
