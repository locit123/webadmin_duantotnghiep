import { HIDE_LIGHT_BOX, SHOW_LIGHT_BOX } from "../../utils/contants";

export const initState = {
  showLightBox: false,
};

const lightBoxSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_LIGHT_BOX:
      return {
        ...state,
        showLightBox: true,
      };
    case HIDE_LIGHT_BOX:
      return {
        ...state,
        showLightBox: false,
      };

    default:
      return state;
  }
};

export default lightBoxSlice;
