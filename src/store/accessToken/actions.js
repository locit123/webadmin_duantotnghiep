import { createAction } from "redux-actions";
import { SET_ACCESS_TOKEN } from "../../utils/contants";

export const setAccessToken = createAction(SET_ACCESS_TOKEN, (payload) => {
  return {
    payload,
  };
});
