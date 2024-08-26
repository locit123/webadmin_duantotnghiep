import { createAction } from "redux-actions";
import { HIDE_SCROLL_TOP, SHOW_SCROLL_TOP } from "../../utils/contants";

export const showScrollTop = createAction(SHOW_SCROLL_TOP);
export const hideScrollTop = createAction(HIDE_SCROLL_TOP);
