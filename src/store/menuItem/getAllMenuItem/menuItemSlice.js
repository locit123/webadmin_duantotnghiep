import { getType } from "../../auth/login/actions";
import { typeActionMenuItem } from "./actions";

export const initState = {
  isLoadingMenuItem: false,
  isErrorMenuItem: null,
  dataMenuItem: null,
};

const menuItemSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionMenuItem.fetchMenuItemRequest):
      return {
        ...state,
        isLoadingMenuItem: true,
        isErrorMenuItem: null,
        dataMenuItem: null,
      };
    case getType(typeActionMenuItem.fetchMenuItemSuccess):
      return {
        ...state,
        isLoadingMenuItem: false,
        isErrorMenuItem: null,
        dataMenuItem: action.payload,
      };
    case getType(typeActionMenuItem.fetchMenuItemFailed):
      return {
        ...state,
        isLoadingMenuItem: false,
        isErrorMenuItem: action.payload,
        dataMenuItem: null,
      };

    default:
      return state;
  }
};

export default menuItemSlice;
