import { createActions } from "redux-actions";

export const typeActionGetOrderByTableId = createActions({
  fetchGetOrderByTableIdRequest: undefined,
  fetchGetOrderByTableIdSuccess: (payload) => payload,
  fetchGetOrderByTableIdFailed: (payload) => payload,
});
