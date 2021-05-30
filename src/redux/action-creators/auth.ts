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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.user.role);
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
      const response = await axios.post("/users/login", formProps);
      dispatch({
        type: ActionType.AUTH_USER,
        payload: {
          token: response.data.token,
          role: response.data.data.user.role,
        },
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.user.role);
      callback();
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: "Invalid login credentials",
      });
    }
  };

export const signout =
  (callback: any) => async (dispatch: Dispatch<Action>) => {
    try {
      await axios.get("/users/logout");
      dispatch({
        type: ActionType.AUTH_USER,
        payload: {
          token: "",
          role: "",
        },
      });
      localStorage.clear();
      callback();
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: error.message,
      });
    }
  };

export const updatePassword =
  (formProps: any, callbackSuccess: any, callbackError: any) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.patch("/users/updatePassword", formProps);
      dispatch({
        type: ActionType.AUTH_USER,
        payload: {
          token: response.data.token,
          role: response.data.data.user.role,
        },
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.data.user.role);
      callbackSuccess();
    } catch (error) {
      dispatch({
        type: ActionType.AUTH_ERROR,
        payload: "Cannot update password",
      });
      callbackError();
    }
  };
