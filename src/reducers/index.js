import { combineReducers } from "redux";
import { adsReducer } from "./adReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  ads:adsReducer
});

export default rootReducer;
