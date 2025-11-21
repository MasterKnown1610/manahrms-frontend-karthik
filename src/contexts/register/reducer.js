import { initialState } from "./state";
import { RegisterActions } from "./action";

const registerHandler = {
  [RegisterActions.REGISTER]: (state, action) => ({
    ...state,
    register: action.payload,
  }),
};

const Reducer = (state, action) => {
  const handler = registerHandler[action.type];
  return handler ? handler(state, action) : state;
};

export default Reducer;
