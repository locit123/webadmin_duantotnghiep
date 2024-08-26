import { createAction } from "redux-actions";
import { STATISTICAL_PAYMENT } from "../../../utils/contants";

export const setDataPayment = createAction(STATISTICAL_PAYMENT, (payload) => {
  return { payload };
});
