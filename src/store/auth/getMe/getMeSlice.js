import { getType } from "../login/actions";
import { typeActionGetMes } from "./actions";

export const initState = {
  isLoading: false,
  isError: null,
  isDataMe: null,
};

const getMeSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetMes.fetchGetMeRequest):
      return {
        isLoading: true,
        isError: null,
        isLogin: null,
      };
    case getType(typeActionGetMes.fetchGetMeSuccess):
      return {
        isLoading: false,
        isDataMe: action.payload,
        isError: null,
      };
    case getType(typeActionGetMes.fetchGetMeFailed):
      return {
        isLoading: false,
        isError: action.payload,
        isLogin: null,
      };

    default:
      return state;
  }
};
export default getMeSlice;
