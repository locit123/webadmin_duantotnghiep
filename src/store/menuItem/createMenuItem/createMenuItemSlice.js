import { getType } from "../../auth/login/actions";
import { typeActionCreateMenuItem } from "./actions";

export const initState = {
  isLoadingCreateMenuItem: false,
  isErrorCreateMenuItem: null,
  dataCreateMenuItem: null,
};

const createMenuItemSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionCreateMenuItem.fetchCreateMenuItemRequest):
      return {
        ...state,
        isLoadingCreateMenuItem: true,
        isErrorCreateMenuItem: null,
        dataCreateMenuItem: null,
      };
    case getType(typeActionCreateMenuItem.fetchCreateMenuItemSuccess):
      return {
        ...state,
        isLoadingCreateMenuItem: false,
        isErrorCreateMenuItem: null,
        dataCreateMenuItem: action.payload,
      };
    case getType(typeActionCreateMenuItem.fetchCreateMenuItemFailed):
      return {
        ...state,
        isLoadingCreateMenuItem: false,
        isErrorCreateMenuItem: action.payload,
        dataCreateMenuItem: null,
      };

    default:
      return state;
  }
};

export default createMenuItemSlice;
