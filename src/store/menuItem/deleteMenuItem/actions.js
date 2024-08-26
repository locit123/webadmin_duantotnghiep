import { createActions } from "redux-actions";

export const typeActionDeleteMenuItem = createActions({
  fetchDeleteMenuItemRequest: undefined,
  fetchDeleteMenuItemSuccess: (payload) => payload,
  fetchDeleteMenuItemFailed: (payload) => payload,
});
