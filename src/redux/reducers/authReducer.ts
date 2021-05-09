import { ActionType } from "../action-types";
import { Action } from "../actions";

interface AuthState {
  authenticated: string;
  errorMessage: string;
}

const initialState = {
  authenticated: "",
  errorMessage: "",
};

const authReducer = (
  state: AuthState = initialState,
  action: Action
): AuthState => {
  switch (action.type) {
    case ActionType.AUTH_USER:
      return { ...state, authenticated: action.payload };
    case ActionType.AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default authReducer;
