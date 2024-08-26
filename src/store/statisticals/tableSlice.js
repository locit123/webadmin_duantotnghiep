import { getType } from "../auth/login/actions";
import { typeActionTableStatistical } from "./tableActions";

const initState = {
  arrListTable: [],
  isLoading: false,
};

const tableSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionTableStatistical.fetchRequestTableStatistical):
      return {
        ...state,
        arrListTable: [],
        isLoading: true,
      };
    case getType(typeActionTableStatistical.fetchSuccessTableStatistical):
      return {
        ...state,
        arrListTable: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default tableSlice;
