import { createActions } from "redux-actions";

export const typeActionCreateMenuItem = createActions({
  fetchCreateMenuItemRequest: undefined,
  fetchCreateMenuItemSuccess: (payload) => payload,
  fetchCreateMenuItemFailed: (payload) => payload,
});
