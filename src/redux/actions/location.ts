import { ActionType } from "../action-types";

export interface GetLocationAction {
  type: ActionType.GET_LOCATION;
  payload: {
    location: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}
