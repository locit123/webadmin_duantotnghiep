import { SHOW_SLIDER } from "../../utils/contants";

export const initState = {
  showSlider: false,
};

const sliderSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_SLIDER:
      return {
        ...state,
        showSlider: action.payload,
      };
    default:
      return state;
  }
};

export default sliderSlice;
