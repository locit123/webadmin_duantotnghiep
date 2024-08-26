import { getType } from "../../auth/login/actions";
import { valueFormTable } from "./actions";

export const initState = {
  tableNumber: "",
  status: "lock",
};

const valueFormTableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(valueFormTable.setTableNumber):
      return {
        ...state,
        tableNumber: action.payload,
      };
    case getType(valueFormTable.setDataName):
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default valueFormTableSlice;
