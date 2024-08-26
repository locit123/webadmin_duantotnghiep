import { HIDE_SCROLL_TOP, SHOW_SCROLL_TOP } from "../../utils/contants";

export const initState = {
  showScroll: false,
};

const scrollSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_SCROLL_TOP:
      return {
        ...state,
        showScroll: true,
      };
    case HIDE_SCROLL_TOP:
      return {
        ...state,
        showScroll: false,
      };

    default:
      return state;
  }
};

export default scrollSlice;
