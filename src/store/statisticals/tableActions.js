import { createActions } from "redux-actions";

export const typeActionTableStatistical = createActions({
  fetchRequestTableStatistical: undefined,
  fetchSuccessTableStatistical: (payload) => payload,
});
