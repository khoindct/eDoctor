import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem("token") || "",
      authorization: localStorage.getItem("role") || "",
      errorMessage: "",
    },
  },
  applyMiddleware(thunk)
);
