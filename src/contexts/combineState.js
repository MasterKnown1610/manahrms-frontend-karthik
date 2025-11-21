import { useMemo } from "react";
import { LoginState } from "./login/state";
import { RegisterState } from "./register/state";

const useCombineState = () => {
  const loginState = LoginState();
  const registerState = RegisterState();
  return useMemo(
    () => ({
      loginState,
      registerState,
    }),
    [loginState, registerState]
  );
};

export default useCombineState;
