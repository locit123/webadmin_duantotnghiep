import { createActions } from "redux-actions";

export const typeActionGetAllUsers = createActions({
  fetchGetAllUsersRequest: undefined,
  fetchGetAllUsersSuccess: (payload) => payload,
  fetchGetAllUsersFailed: (payload) => payload,
});
