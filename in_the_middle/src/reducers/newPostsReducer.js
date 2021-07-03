export const initialState = {
  post: [{ comments: [] }],
};
export const NEW_POST = "NEW_POST";
export const NEW_COMMENT = "NEW_COMMENT";

const newPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POST:
      if (state === initialState) {
        return {
          post: [
            {
              email: action.payload.email,
              message: action.payload.message,
              photoUrl: action.payload.photoUrl,
              timestamp: action.payload.photoUrl,
              comment: "",
            },
          ],
        };
      } else {
        return {
          post: [
            ...state.post,
            {
              email: action.payload.email,
              message: action.payload.message,
              photoUrl: action.payload.photoUrl,
              timestamp: action.payload.photoUrl,
              comment: "",
            },
          ],
        };
      }

    case NEW_COMMENT:
      return {
        ...state,
        email: action.payload.email,
        message: action.payload.message,
        photoUrl: action.payload.photoUrl,
        timestamp: action.payload.photoUrl,
      };
    default:
      return state;
  }
};
export default newPostsReducer;
