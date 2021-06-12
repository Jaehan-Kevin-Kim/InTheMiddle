export const LOAD_ITEMS_REQUEST = "LOAD_ITEMS_REQUEST";
export const LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS";
export const LOAD_ITEMS_FAILURE = "LOAD_ITEMS_FAILURE";

export const ADD_ITEM_REQUEST = "ADD_ITEM_REQUEST";
export const ADD_ITEM_SUCCESS = "ADD_ITEM_SUCCESS";
export const ADD_ITEM_FAILURE = "ADD_ITEM_FAILURE";

export const REMOVE_ITEM_REQUEST = "REMOVE_ITEM_REQUEST";
export const REMOVE_ITEM_SUCCESS = "REMOVE_ITEM_SUCCESS";
export const REMOVE_ITEM_FAILURE = "REMOVE_ITEM_FAILURE";

export const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_SUCCESS:
      return {
        ...state,
        itemCost: action.data.itemCost,
        itemDesc: action.data.itemDesc,
        itemImg: action.data.itemImg,
        itemName: action.data.itemName,
        itemRegion: action.data.itemRegion,
        userId: action.data.userId,
      };
    default:
      return state;
  }
};

export default itemsReducer;
