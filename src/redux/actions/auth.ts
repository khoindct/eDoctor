import { ActionType } from "../action-types";

export interface AuthUserAction {
  type: ActionType.AUTH_USER;
  payload: string;
}

export interface AuthUserErrorAction {
  type: ActionType.AUTH_ERROR;
  payload: string;
}
