import { createActions } from "redux-actions";
export const typeActionResetPassword = createActions({
  fetchResetPasswordRequest: undefined,
  fetchResetPasswordSuccess: (payload) => payload,
  fetchResetPasswordFailed: (payload) => payload,
});
