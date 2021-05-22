import api from "../../api";
import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

const axios = api();

export const signup =
  (formProps: any, callback: any) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.post("/users/signup", formProps);
      dispatch({
        type: ActionType.AUTH_USER,
        payload: {
          token: response.data.token,
          role: response.data.data.user.role,
        },
      });
      callback();
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: "Email in use",
      });
    }
  };

export const signin =
  (formProps: any, callback: any) => async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.post("/users/signin", formProps);
      dispatch({
        type: ActionType.AUTH_USER,
        payload: {
          token: response.data.token,
          role: response.data.data.user.role,
        },
      });
      callback();
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: "Invalid login credentials",
      });
    }
  };

export const signout = () => {
  return {
    type: ActionType.AUTH_USER,
    payload: "",
  };
};
