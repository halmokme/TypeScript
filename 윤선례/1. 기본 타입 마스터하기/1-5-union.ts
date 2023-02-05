{
  /**
   * Union Types: OR
   * 모든 가능한 케이스 중에 발생할 수 있는 딱 하나를 담을 수 있는 타입
   */
  type Direction = "left" | "right" | "up" | "down";
  function move(direction: Direction) {
    console.log(direction);
  }
  move("down");

  type TileSize = 8 | 16 | 32;
  const tile: TileSize = 16;

  // function: login -> success, fail
  type SuccessState = {
    response: {
      body: string;
    };
  };

  type FailState = {
    reason: string;
  };

  type LoginState = SuccessState | FailState;

  //  보통은 Promise 형태. function login(id :string, password: string): :Promise<LoginState> {
  function login(id: string, password: string): LoginState {
    return {
      response: {
        body: "logged in!",
      },
    };
  }

  // printLoginState(state: LoginState)
  // success -> 🎉 body
  // fail -> 😭 reason

  function printLoginState(state: LoginState) {
    if ("response" in state) {
      // in 키워드를 사용하는 것은 별로 좋은 방식이 아님. 다음 장 Discriminated Union 활용하기
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}
