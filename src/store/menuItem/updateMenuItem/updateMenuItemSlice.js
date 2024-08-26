import { getType } from "../../auth/login/actions";
import { typeActionUpdateMenuItem } from "./actions";

export const initState = {
  isLoadingUpdateMenuItem: false,
  isErrorUpdateMenuItem: null,
  dataUpdateMenuItem: null,
};

const updateMenuItemSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionUpdateMenuItem.fetchUpdateMenuItemRequest):
      return {
        isLoadingUpdateMenuItem: true,
        isErrorUpdateMenuItem: null,
        dataUpdateMenuItem: null,
      };
    case getType(typeActionUpdateMenuItem.fetchUpdateMenuItemSuccess):
      return {
        isLoadingUpdateMenuItem: false,
        isErrorUpdateMenuItem: null,
        dataUpdateMenuItem: action.payload,
      };
    case getType(typeActionUpdateMenuItem.fetchUpdateMenuItemFailed):
      return {
        isLoadingUpdateMenuItem: false,
        isErrorUpdateMenuItem: action.payload,
        dataUpdateMenuItem: null,
      };

    default:
      return state;
  }
};

export default updateMenuItemSlice;
