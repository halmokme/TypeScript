// Discriminated Union : Union 타입에 차별화 되는, 이름이 동일한 공통적인 타입을 둠으로써 간편하게 구분할 수 있음
{
  type SuccessState = {
    result: "success";
    response: {
      body: string;
    };
  };

  type FailState = {
    result: "fail";
    reason: string;
  };

  type LoginState = SuccessState | FailState;

  function login(id: string, password: string): LoginState {
    return {
      result: "success",
      response: {
        body: "logged in!",
      },
    };
  }
  // printLoginState(state: LoginState)
  // success -> 🎉 body
  // fail -> 😭 reason
  // 조금 더 직관적인 코드 작성 가능

  function printLoginState(state: LoginState) {
    if (state.result === "success") {
      // Discriminated Union 활용 (여기서는 result)
      console.log(`🎉 ${state.response.body}`);
    } else {
      console.log(`😭 ${state.reason}`);
    }
  }
}
