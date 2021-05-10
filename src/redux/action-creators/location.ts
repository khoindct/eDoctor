import { Dispatch } from "redux";
import { ActionType } from "../action-types";
import { Action } from "../actions";

export const getLocation = (data: any) => (dispatch: Dispatch<Action>) => {
  dispatch({
    type: ActionType.GET_LOCATION,
    payload: data,
  });
};
