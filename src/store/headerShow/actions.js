import { createAction } from "redux-actions";
import { HIDE_HEADER, SHOW_HEADER } from "../../utils/contants";

export const setShowHeader = createAction(SHOW_HEADER);
export const setHideHeader = createAction(HIDE_HEADER);
