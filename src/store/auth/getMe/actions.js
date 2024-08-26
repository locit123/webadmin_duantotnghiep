import { createActions } from "redux-actions";

export const typeActionGetMes = createActions({
  fetchGetMeRequest: undefined,
  fetchGetMeSuccess: (payload) => payload,
  fetchGetMeFailed: (payload) => payload,
});
