import { createActions } from "redux-actions";

export const getType = (typeAction) => {
  return typeAction().type;
};

export const typeActionLogins = createActions({
  fetchRequest: undefined,
  fetchSuccess: (payload) => payload,
  fetchFailed: (payload) => payload,
  fetchLogout: (payload) => payload,
});
