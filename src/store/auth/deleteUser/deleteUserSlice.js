import { getType } from "../login/actions";
import { typeActionDeleteUser } from "./actions";

export const initState = {
  isLoadingDeleteUser: false,
  isErrorDeleteUser: null,
  dataDeleteUser: null,
};

const deleteUserSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteUser.fetchDeleteUserRequest):
      return {
        ...state,
        isLoadingDeleteUser: true,
        isErrorDeleteUser: null,
        dataDeleteUser: null,
      };
    case getType(typeActionDeleteUser.fetchDeleteUserSuccess):
      return {
        ...state,
        isLoadingDeleteUser: false,
        isErrorDeleteUser: null,
        dataDeleteUser: action.payload,
      };
    case getType(typeActionDeleteUser.fetchDeleteUserFailed):
      return {
        ...state,
        isLoadingDeleteUser: false,
        isErrorDeleteUser: action.payload,
        dataDeleteUser: null,
      };

    default:
      return state;
  }
};

export default deleteUserSlice;
