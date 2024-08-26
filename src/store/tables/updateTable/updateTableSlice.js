import { getType } from "../../auth/login/actions";
import { typeActionUpdateTables } from "./actions";

const initState = {
  isLoadingUpdate: false,
  isErrorUpdate: null,
  dataUpdate: null,
};

const updateTableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionUpdateTables.fetchUpdateTableRequest):
      return {
        ...state,
        isLoadingUpdate: true,
      };
    case getType(typeActionUpdateTables.fetchUpdateTableSuccess):
      return {
        ...state,
        isLoadingUpdate: false,
        dataUpdate: action.payload,
        isErrorUpdate: null,
      };
    case getType(typeActionUpdateTables.fetchUpdateTableFailed):
      return {
        ...state,
        isLoadingUpdate: false,
        dataUpdate: null,
        isErrorUpdate: action.payload,
      };
    case getType(typeActionUpdateTables.fetchUpdateTableReset):
      return {
        ...state,
        isLoadingUpdate: false,
        isErrorUpdate: null,
        dataUpdate: null,
      };

    default:
      return state;
  }
};

export default updateTableSlice;
