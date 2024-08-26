import { createActions } from "redux-actions";

export const typeActionCreateTables = createActions({
  fetchCreateTableRequest: undefined,
  fetchCreateTableSuccess: (payload) => payload,
  fetchCreateTableFailed: (payload) => payload,
  fetchCreateTableReset: undefined,
});
