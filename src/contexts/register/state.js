import { useReducer } from "react";
import axios from "axios";
import Reducer from "./reducer";
import API_URLS from "../../services/config";
import { RegisterActions } from "./action";

export const initialState = {
  register: null,
};

export const RegisterState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const getregister = async (data) => {
    try {
      const response = await axios.post(`${API_URLS.Register}`, data);
      dispatch({ type: RegisterActions.REGISTER, payload: response.data });
      return response;
    } catch (error) {
      console.log(error, "register error");
      return error;
    }
  };
  return {
    ...state,
    getregister,
  };
};
