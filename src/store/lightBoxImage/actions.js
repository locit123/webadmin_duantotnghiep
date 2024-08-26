import { createAction } from "redux-actions";
import { HIDE_LIGHT_BOX, SHOW_LIGHT_BOX } from "../../utils/contants";

export const setShowLightBox = createAction(SHOW_LIGHT_BOX);
export const setHideLightBox = createAction(HIDE_LIGHT_BOX);
