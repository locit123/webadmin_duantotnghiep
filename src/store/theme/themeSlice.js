import { HIDE_THEME, SHOW_THEME } from "../../utils/contants";

export const initState = {
  showTheme: false,
};

const themeSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_THEME:
      return {
        ...state,
        showTheme: true,
      };
    case HIDE_THEME:
      return {
        ...state,
        showTheme: false,
      };
    default:
      return state;
  }
};
export default themeSlice;
