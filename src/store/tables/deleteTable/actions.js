import { createActions } from "redux-actions";

export const typeActionDeleteTables = createActions({
  fetchDeleteTableRequest: undefined,
  fetchDeleteTableSuccess: (payload) => payload,
  fetchDeleteTableFailed: (payload) => payload,
});
