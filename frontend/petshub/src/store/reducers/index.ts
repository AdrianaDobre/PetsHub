import { combineReducers } from "redux";
import testReducer from "../reducers/testReducer";
import tokenReducer from "../reducers/tokenReducer";
import tripReducer from "./tripReducer";

const rootReducer = combineReducers({
  testReducer,
  tokenReducer,
  tripReducer,
});

export default rootReducer;