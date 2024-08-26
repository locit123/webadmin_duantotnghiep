import { createActions } from "redux-actions";

export const typeActionMenuItem = createActions({
  fetchMenuItemRequest: undefined,
  fetchMenuItemSuccess: (payload) => payload,
  fetchMenuItemFailed: (payload) => payload,
});
