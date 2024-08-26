import { createActions } from "redux-actions";

export const typeActionGetCategories = createActions({
  fetchGetCategoriesRequest: undefined,
  fetchGetCategoriesSuccess: (payload) => payload,
  fetchGetCategoriesFailed: (payload) => payload,
});
