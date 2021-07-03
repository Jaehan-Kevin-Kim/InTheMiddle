import { ITEM } from "../reducers/itemsReducer";

export const newPostAction = (feed) => {
  return {
    type: ITEM,
    payload: feed,
  };
};

// export default { newPostAction, newCommentAction };
