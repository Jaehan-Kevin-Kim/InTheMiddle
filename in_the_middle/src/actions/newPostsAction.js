import { NEW_COMMENT, NEW_POST } from "../reducers/newPostsReducer";

export const newPostAction = (feed) => {
  return {
    type: NEW_POST,
    payload: feed,
  };
};

export const newCommentAction = (comment) => {
  return {
    type: NEW_COMMENT,
    paylaod: comment,
  };
};

// export default { newPostAction, newCommentAction };
