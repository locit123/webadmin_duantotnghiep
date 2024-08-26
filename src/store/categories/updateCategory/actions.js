import { createActions } from "redux-actions";

export const typeActionUpdateCategory = createActions({
  fetchUpdateCategoryRequest: undefined,
  fetchUpdateCategorySuccess: (payload) => payload,
  fetchUpdateCategoryFailed: (payload) => payload,
});
