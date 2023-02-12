// 제네릭을 이용, 스택을 제네릭 타입으로 변경. 재사용성이 좋은 제네릭으로 다양한 타입을 받을 수 있도록 구현할 수 있다

// 1. string을 T 타입으로 변경
// 2. 인터페이스, 함수, 클래스 정의 부분에 <T>
// 3. 클래스에도 T 정의, 인터페이스 구현부에도 T 정의
// 4. node를 head에 할당하는데, head가 이미 정확한 타입 명시되어 있으므로 타입 추론 이용
// 5. 인스턴스 생성 시 타입을 따로 명시해야 함
// -> 제네릭을 이용해, 타입이 보장되면서 다양한 데이터를 담을 수 있는 코드 완성

{
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
    // 단일 연결 리스트의 제일 마지막이면 undefined
    // 사용자가 데이터를 넣어서 한 단계 감싸는 형태라면, 불변성을 유지해야 함(readonly)
  };

  class StackImpl<T> implements Stack<T> {
    // 내부에서만 쓰는 변수, 앞에 _를 붙여서 동일한 이름의 퍼블릭 변수 있음을 명시
    private _size: number = 0;
    private head?: StackNode<T>;

    constructor(private capacity: number) {}

    get size() {
      return this._size;
    }

    push(value: T) {
      if (this.size === this.capacity) {
        throw new Error("스택이 가득 찼습니다.");
      }
      // Node를 만들고, 만든 것은 기존 head가 가리키던 것을 next로 가리킴
      // head는 새로 들어온 것을 가리키게 된다
      const node = { value, next: this.head };
      // const node: StackNode<T> = { value, next: this.head } 와 동일함 (타입 추론)
      this.head = node;
      this._size++;
    }

    pop(): T {
      if (this.head == null) {
        throw new Error("스택이 비어있습니다!");
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  // 이제 인스턴스를 생성할 떄 정확한 타입을 명시해야 함. new StackImpl<string>(10)
  const stack = new StackImpl<string>(10);
  stack.push("아메리카노");
  stack.push("크림브륄레");
  stack.push("체리블라썸");
  stack.push("샌드위치");

  while (stack.size !== 0) {
    console.log(stack.pop());
  }

  // 제네릭을 사용해서, 타입이 보장되면서 다양한 데이터를 담을 수 있다
  const stack2 = new StackImpl<number>(10);
  stack2.push(123);
  stack2.push(456);
  stack2.push(789);
  stack2.push(101112);

  while (stack2.size !== 0) {
    console.log(stack2.pop());
  }
}
