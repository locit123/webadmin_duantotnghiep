import { createAction } from "redux-actions";
import { SET_DAILY_STATISTICS } from "../../../utils/contants";

export const setDataDailyStatistics = createAction(
  SET_DAILY_STATISTICS,
  (payload) => payload
);
