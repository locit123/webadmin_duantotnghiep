import { MENU_OPTION } from "../../../utils/contants";

export const initState = {
  options: [],
};

const menuOptionSlice = (state = initState, action) => {
  switch (action.type) {
    case MENU_OPTION:
      return {
        ...state,
        options: action.payload,
      };

    default:
      return state;
  }
};

export default menuOptionSlice;
