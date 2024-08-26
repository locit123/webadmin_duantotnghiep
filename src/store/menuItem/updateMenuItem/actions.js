import { createActions } from "redux-actions";

export const typeActionUpdateMenuItem = createActions({
  fetchUpdateMenuItemRequest: undefined,
  fetchUpdateMenuItemSuccess: (payload) => payload,
  fetchUpdateMenuItemFailed: (payload) => payload,
});
