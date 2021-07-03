import newpostsReducer from "./newPostsReducer";
import itemsReducer from "./itemsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  newpostsReducer,
  itemsReducer,
});
export default rootReducer;
