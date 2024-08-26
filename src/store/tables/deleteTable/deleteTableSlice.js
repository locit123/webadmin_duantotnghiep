import { getType } from "../../auth/login/actions";
import { typeActionDeleteTables } from "./actions";

export const initState = {
  deleteSuccess: {},
  error: {},
  isLoading: false,
};

const deleteTableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteTables.fetchDeleteTableRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(typeActionDeleteTables.fetchDeleteTableSuccess):
      return {
        ...state,
        isLoading: false,
        error: {},
        deleteSuccess: action.payload,
      };
    case getType(typeActionDeleteTables.fetchDeleteTableFailed):
      return {
        ...state,
        isLoading: false,
        deleteSuccess: {},
        error: action.payload,
      };

    default:
      return state;
  }
};

export default deleteTableSlice;
