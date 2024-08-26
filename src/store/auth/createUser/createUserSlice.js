import { getType } from "../login/actions";
import { typeActionCreateUser } from "./actions";

export const initState = {
  isLoadingCreateUser: false,
  isErrorCreateUser: null,
  dataCreateUser: null,
};

const createUserSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionCreateUser.fetchCreateUserRequest):
      return {
        ...state,
        isLoadingCreateUser: true,
        isErrorCreateUser: null,
        dataCreateUser: null,
      };
    case getType(typeActionCreateUser.fetchCreateUserSuccess):
      return {
        ...state,
        isLoadingCreateUser: false,
        isErrorCreateUser: null,
        dataCreateUser: action.payload,
      };
    case getType(typeActionCreateUser.fetchCreateUserFailed):
      return {
        ...state,
        isLoadingCreateUser: false,
        isErrorCreateUser: action.payload,
        dataCreateUser: null,
      };

    default:
      return state;
  }
};

export default createUserSlice;
