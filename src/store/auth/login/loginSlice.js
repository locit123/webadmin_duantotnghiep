import { getType, typeActionLogins } from "./actions";

export const initState = {
  isLoading: false,
  isError: null,
  isLogin: null,
};

const loginSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionLogins.fetchRequest):
      return {
        isLoading: true,
        isError: null,
        isLogin: null,
      };

    case getType(typeActionLogins.fetchSuccess):
      return {
        isLoading: false,
        isLogin: action.payload,
        isError: null,
      };
    case getType(typeActionLogins.fetchFailed):
      return {
        isLoading: false,
        isError: action.payload,
        isLogin: null,
      };
    case getType(typeActionLogins.fetchLogout):
      return {
        isLoading: false,
        isError: null,
        isLogin: null,
      };

    default:
      return state;
  }
};
export default loginSlice;
