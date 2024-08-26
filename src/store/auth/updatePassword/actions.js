import { createActions } from "redux-actions";

export const typeActionUpdatePassword = createActions({
  fetchUpdatePasswordRequest: undefined,
  fetchUpdatePasswordSuccess: (payload) => payload,
  fetchUpdatePasswordFailed: (payload) => payload,
});
