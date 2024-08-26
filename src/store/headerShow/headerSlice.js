import { HIDE_HEADER, SHOW_HEADER } from "../../utils/contants";

export const initState = {
  showHeader: false,
};

const headerSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_HEADER:
      return {
        ...state,
        showHeader: true,
      };
    case HIDE_HEADER:
      return {
        ...state,
        showHeader: false,
      };
    default:
      return state;
  }
};
export default headerSlice;
