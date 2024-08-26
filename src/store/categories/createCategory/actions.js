import { createActions } from "redux-actions";

export const typeActionCreateCategory = createActions({
  fetchCreateCategoryRequest: undefined,
  fetchCreateCategorySuccess: (payload) => payload,
  fetchCreateCategoryFailed: (payload) => payload,
});
