import { createActions } from "redux-actions";

export const typeActionCreateUser = createActions({
  fetchCreateUserRequest: undefined,
  fetchCreateUserSuccess: (payload) => payload,
  fetchCreateUserFailed: (payload) => payload,
});
