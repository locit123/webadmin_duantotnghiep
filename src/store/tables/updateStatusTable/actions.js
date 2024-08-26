import { createActions } from "redux-actions";

export const typeActionUpdateStatusTables = createActions({
  fetchUpdateStatusTableRequest: undefined,
  fetchUpdateStatusTableSuccess: (payload) => payload,
  fetchUpdateStatusTableFailed: (payload) => payload,
});
