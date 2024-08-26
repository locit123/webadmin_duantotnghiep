import { createActions } from "redux-actions";

export const typeActionUpdateMe = createActions({
  fetchUpdateMeRequest: undefined,
  fetchUpdateMeSuccess: (payload) => payload,
  fetchUpdateMeFailed: (payload) => payload,
});
