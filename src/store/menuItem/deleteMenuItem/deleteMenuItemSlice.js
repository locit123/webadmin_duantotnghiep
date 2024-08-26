import { getType } from "../../auth/login/actions";
import { typeActionDeleteMenuItem } from "./actions";

export const initState = {
  isLoadingDeleteMenuItem: false,
  isErrorDeleteMenuItem: null,
  dataDeleteMenuItem: null,
};

const deleteMenuItemSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteMenuItem.fetchDeleteMenuItemRequest):
      return {
        ...state,
        isLoadingDeleteMenuItem: true,
        isErrorDeleteMenuItem: null,
        dataDeleteMenuItem: null,
      };
    case getType(typeActionDeleteMenuItem.fetchDeleteMenuItemSuccess):
      return {
        ...state,
        isLoadingDeleteMenuItem: false,
        isErrorDeleteMenuItem: null,
        dataDeleteMenuItem: action.payload,
      };
    case getType(typeActionDeleteMenuItem.fetchDeleteMenuItemFailed):
      return {
        ...state,
        isLoadingDeleteMenuItem: false,
        isErrorDeleteMenuItem: action.payload,
        dataDeleteMenuItem: null,
      };

    default:
      return state;
  }
};

export default deleteMenuItemSlice;
