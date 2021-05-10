import { combineReducers } from "redux";
import authReducer from "./authReducer";
import locationReducer from "./locationReducer";

const reducers = combineReducers({
  auth: authReducer,
  locations: locationReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
