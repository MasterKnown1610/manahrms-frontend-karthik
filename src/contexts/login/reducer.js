import { initialState } from "./state";

const loginHandler = {
  SET_LOGIN: (state, action) => ({
    ...state,
    login: action.payload,
    userData: action.payload,
  }),
  LOGIN: (state, action) => ({
    ...state,
    login: action.payload,
    token: action.payload.token || state.token,
    userData: action.payload,
  }),
  SET_TOKEN: (state, action) => ({
    ...state,
    token: action.payload,
  }),
  RESET_ALL: (state, action) => initialState,
};

const Reducer = (state, action) => {
  const handler = loginHandler[action.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
