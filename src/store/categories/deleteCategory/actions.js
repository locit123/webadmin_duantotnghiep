import { createActions } from "redux-actions";

export const typeActionDeleteCategory = createActions({
  fetchDeleteCategoryRequest: undefined,
  fetchDeleteCategorySuccess: (payload) => payload,
  fetchDeleteCategoryFailed: (payload) => payload,
});
