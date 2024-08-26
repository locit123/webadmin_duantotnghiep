import { createActions } from "redux-actions";

export const typeActionUpdateTables = createActions({
  fetchUpdateTableRequest: undefined,
  fetchUpdateTableSuccess: (payload) => payload,
  fetchUpdateTableFailed: (payload) => payload,
  fetchUpdateTableReset: undefined,
});
