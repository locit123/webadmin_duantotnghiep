import { getType } from "../../auth/login/actions";
import { typeActionUpdateStatusTables } from "./actions";

export const initState = {
  isLoadingUpdateStatus: false,
  isErrorUpdateStatus: null,
  isDataUpdateStatus: null,
};

const updateStatusTableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionUpdateStatusTables.fetchUpdateStatusTableRequest):
      return {
        isLoadingUpdateStatus: true,
        isErrorUpdateStatus: null,
        isDataUpdateStatus: null,
      };
    case getType(typeActionUpdateStatusTables.fetchUpdateStatusTableSuccess):
      return {
        isLoadingUpdateStatus: false,
        isErrorUpdateStatus: null,
        isDataUpdateStatus: action.payload,
      };
    case getType(typeActionUpdateStatusTables.fetchUpdateStatusTableFailed):
      return {
        isLoadingUpdateStatus: false,
        isErrorUpdateStatus: action.payload,
        isDataUpdateStatus: null,
      };

    default:
      return state;
  }
};

export default updateStatusTableSlice;
