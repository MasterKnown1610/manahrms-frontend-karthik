import { useReducer, useEffect } from "react";
import axios from "axios";
import Reducer from "./reducer";
import API_URLS from "../../services/config";
import { LoginActions } from "./action";

export const initialState = {
  login: null,
  token: localStorage.getItem("token") || null,
};

export const LoginState = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  // Initialize token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !state.token) {
      dispatch({ type: LoginActions.SET_TOKEN, payload: storedToken });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URLS.Login}`, {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      dispatch({
        type: LoginActions.LOGIN,
        payload: { ...response.data, token },
      });
      return response;
    } catch (error) {
      console.log(error, "login error");
      throw error;
    }
  };

  return {
    ...state,
    login,
  };
};
