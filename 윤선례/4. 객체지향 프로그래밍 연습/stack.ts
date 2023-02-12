// STACK : LIFO
// Last In First Out 나중에 들어온 것이 먼저 나간다

// ts에서 제공하는 자료구조를 이용하지 않고 (배열),
// **스택 자료구조 만들어보기 (문자열을 넣고 담을 수 있는 스택)**
// 클래스를 어떻게 만들 수 있을 지,
// push() 아이템이 위로 올라옴
// pop() 마지막 아이템이 먼저 나감 등을 이용

{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
    // 단일 연결 리스트의 제일 마지막이면 undefined
    // 사용자가 데이터를 넣어서 한 단계 감싸는 형태라면, 불변성을 유지해야 함(readonly)
  };

  class StackImpl implements Stack {
    // 내부에서만 쓰는 변수, 앞에 _를 붙여서 동일한 이름의 퍼블릭 변수 있음을 명시
    private _size: number = 0;
    private head?: StackNode;
    // 인터페이스에서 readonly 이므로 외부에서 사이즈 변경 불가능,
    // 내부에서는 사이즈 정보 변경 가능해야 하므로 private으로 설정
    // 외부에서 접근 가능한 get 사용 (get: 읽기만 가능)

    // Stack 내부 구현 사항: 단일 연결 리스트로 구현
    // head에 할당된 것들을 이용해 아이템을 찾아나가는 방식
    // 새로운 value가 들어오면, 한 단계 감쌀 수 있는 Node를 만들어서
    // head가 새로운 것을 가리키고, 그 이전에 Node가 가리키는 것이 있다면
    // 그것들을 찾아가는 방식 => 데이터를 감쌀 수 있는 Node가 필요하다
    // Node는 데이터 타입

    // 정해진 사이즈 내에서 사용할 수 있도록 만듦
    constructor(private capacity: number) {}

    get size() {
      return this._size;
    }

    push(value: string) {
      if (this.size === this.capacity) {
        throw new Error("스택이 가득 찼습니다.");
      }
      // Node를 만들고, 만든 것은 기존 head가 가리키던 것을 next로 가리킴
      // head는 새로 들어온 것을 가리키게 된다
      const node: StackNode = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    pop(): string {
      // pop 호출 시 스택이 비어있는 지 확인
      // null 체크를 하는 이유 : this.head === undefined일 때는 변수에 null 일 경우 if문을 거치지 않고 통과됨(null은 undefined가 아니므로)
      // null == undefined이므로 동일하다고 간주, this.head == null로 작성
      if (this.head == null) {
        throw new Error("스택이 비어있습니다!");
      }
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl(10);
  stack.push("아메리카노");
  stack.push("크림브륄레");
  stack.push("체리블라썸");
  stack.push("샌드위치");

  // stack의 size가 0이 아닐 때까지 돌면서 하나씩 pop(제거)하면서 콘솔 로그 출력
  while (stack.size !== 0) {
    console.log(stack.pop());
  }
}
