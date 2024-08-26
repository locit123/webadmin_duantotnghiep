import { createActions } from "redux-actions";

export const typeActionForgotPassword = createActions({
  fetchForgotPasswordRequest: undefined,
  fetchForgotPasswordSuccess: (payload) => payload,
  fetchForgotPasswordFailed: (payload) => payload,
});
