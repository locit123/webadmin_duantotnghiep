import { getType } from "../login/actions";
import { typeActionGetAllUsers } from "./actions";

export const initState = {
  isLoadingGetAllUsers: false,
  isErrorGetAllUsers: null,
  dataGetAllUsers: null,
};

const getAllUsersSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetAllUsers.fetchGetAllUsersRequest):
      return {
        isLoadingGetAllUsers: true,
        isErrorGetAllUsers: null,
        dataGetAllUsers: null,
      };
    case getType(typeActionGetAllUsers.fetchGetAllUsersSuccess):
      return {
        isLoadingGetAllUsers: false,
        isErrorGetAllUsers: null,
        dataGetAllUsers: action.payload,
      };
    case getType(typeActionGetAllUsers.fetchGetAllUsersFailed):
      return {
        isLoadingGetAllUsers: false,
        isErrorGetAllUsers: action.payload,
        dataGetAllUsers: null,
      };

    default:
      return state;
  }
};

export default getAllUsersSlice;
