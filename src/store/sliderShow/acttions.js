import { createAction } from "redux-actions";
import { SHOW_SLIDER } from "../../utils/contants";

export const setShowSlider = createAction(SHOW_SLIDER, (payload) => {
  return {
    payload,
  };
});
