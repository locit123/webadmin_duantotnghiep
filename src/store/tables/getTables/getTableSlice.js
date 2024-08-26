import { getType } from "../../auth/login/actions";
import { typeActionGetTables } from "./actions";

const initState = {
  isLoading: false,
  isError: null,
  dataTable: [],
};

const getTableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetTables.fetchGetTableRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(typeActionGetTables.fetchGetTableSuccess):
      return {
        ...state,
        isLoading: false,
        dataTable: action.payload,
      };
    case getType(typeActionGetTables.fetchGetTableFailed):
      return {
        ...state,
        isError: action.payload,
      };

    default:
      return state;
  }
};

export default getTableSlice;
