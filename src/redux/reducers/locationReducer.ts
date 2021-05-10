import { ActionType } from "../action-types";
import { Action } from "../actions";

interface LocationState {
  locations: string[];
  location: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const initialState: LocationState = {
  locations: [],
  location: "",
  coordinates: {
    lat: 10.0425842,
    lng: 105.7659486,
  },
};

const locationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.GET_LOCATION:
      return {
        ...state,
        location: action.payload.location,
        coordinates: action.payload.coordinates,
      };
    default:
      return state;
  }
};

export default locationReducer;
