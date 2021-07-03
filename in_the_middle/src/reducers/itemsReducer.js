export const initialState = {
  data: [],
};
export const ITEM = "ITEM";
// export const NEW_COMMENT = "NEW_COMMENT";

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ITEM: {
      return {
        data: action.payload,
      };
    }
    default:
      return state;
  }
};
export default itemsReducer;
