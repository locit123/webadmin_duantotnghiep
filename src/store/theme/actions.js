import { createAction } from "redux-actions";
import { HIDE_THEME, SHOW_THEME } from "../../utils/contants";

export const setShowTheme = createAction(SHOW_THEME);
export const setHideTheme = createAction(HIDE_THEME);
