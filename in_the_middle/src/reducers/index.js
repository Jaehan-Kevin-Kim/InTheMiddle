import newpostsReducer from "./newposts";
import itemsReducer from "./items";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  newpostsReducer,
  itemsReducer,
});
export default rootReducer;
