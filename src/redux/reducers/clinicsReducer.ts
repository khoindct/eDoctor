import { ActionType } from "../action-types";
import { Action } from "../actions";

interface ClinicsState {
  clinics: [];
  clinic: {};
  loading: boolean;
  error: string | null;
}

const initialState: ClinicsState = {
  clinics: [],
  clinic: {},
  loading: false,
  error: null,
};

const clinicReducer = (state: ClinicsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.CREATE_CLINIC:
      break;
    default:
      return state;
  }
};

export default clinicReducer;
