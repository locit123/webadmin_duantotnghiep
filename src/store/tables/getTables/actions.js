import { createActions } from "redux-actions";

export const typeActionGetTables = createActions({
  fetchGetTableRequest: undefined,
  fetchGetTableSuccess: (payload) => payload,
  fetchGetTableFailed: (payload) => payload,
});
