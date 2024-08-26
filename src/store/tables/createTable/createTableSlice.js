import { getType } from "../../auth/login/actions";
import { typeActionCreateTables } from "./actions";

const initState = {
  isLoading: false,
  isError: null,
  dataTable: null,
};

const CreateTableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionCreateTables.fetchCreateTableRequest):
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case getType(typeActionCreateTables.fetchCreateTableSuccess):
      return {
        ...state,
        isLoading: false,
        isError: null,
        dataTable: action.payload,
      };
    case getType(typeActionCreateTables.fetchCreateTableFailed):
      return {
        ...state,
        isError: action.payload,
        isLoading: false,
      };
    case getType(typeActionCreateTables.fetchCreateTableReset):
      return {
        ...state,
        isError: null,
        dataTable: null,
      };

    default:
      return state;
  }
};

export default CreateTableSlice;
