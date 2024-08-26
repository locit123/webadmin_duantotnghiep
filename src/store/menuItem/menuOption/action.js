import { createAction } from "redux-actions";
import { MENU_OPTION } from "../../../utils/contants";

export const setListOption = createAction(MENU_OPTION, (payload) => {
  return {
    payload,
  };
});
