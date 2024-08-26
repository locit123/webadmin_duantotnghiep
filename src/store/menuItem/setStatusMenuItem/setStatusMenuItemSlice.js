import { getType } from "../../auth/login/actions";
import { setStatusMenuItem } from "./actions";

export const initState = {
  statusItemSlice: ["create"],
};

const setStatusMenuItemSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(setStatusMenuItem.setStatus):
      return {
        ...state,
        statusItemSlice: action.payload,
      };

    default:
      return state;
  }
};

export default setStatusMenuItemSlice;
