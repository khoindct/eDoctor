import { ActionType } from "../action-types";
import { Action } from "../actions";

interface AuthState {
  authenticated: string;
  authorization: string;
  errorMessage: string;
}

const initialState = {
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
      };
    case ActionType.AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default authReducer;
