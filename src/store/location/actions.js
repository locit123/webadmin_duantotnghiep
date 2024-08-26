import { createAction } from "redux-actions";
import { SHOW_LOCATION } from "../../utils/contants";

export const setLocation = createAction(SHOW_LOCATION, (payload) => {
  return {
    payload,
  };
});
