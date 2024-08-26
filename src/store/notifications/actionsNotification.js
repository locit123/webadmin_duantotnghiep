import { createActions } from "redux-actions";

export const typeActionNotificationValues = createActions({
  setTitle: (payload) => payload,
  setContent: (payload) => payload,
  setImage: (payload) => payload,
  setSummary: (payload) => payload,
});
