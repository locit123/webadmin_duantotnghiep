import { createActions } from "redux-actions";

export const typeActionDeleteUser = createActions({
  fetchDeleteUserRequest: undefined,
  fetchDeleteUserSuccess: (payload) => payload,
  fetchDeleteUserFailed: (payload) => payload,
});
