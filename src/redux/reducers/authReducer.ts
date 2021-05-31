import { ActionType } from "../action-types";
import { Action } from "../actions";

interface AuthState {
  authenticated: string;
  authorization: "admin" | "doctor" | "patient" | "";
  errorMessage: string;
}

const initialState: AuthState = {
  authenticated: "",
  authorization: "",
  errorMessage: "",
};

const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return {
        ...state,
        authenticated: action.payload.token,
        authorization: action.payload.role,
        errorMessage: "",
      };
    case ActionType.AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default authReducer;
