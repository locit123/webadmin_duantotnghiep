import { createActions } from "redux-actions";

export const valueFormTable = createActions({
  setTableNumber: (payload) => payload,
  setDataName: (payload) => payload,
});
