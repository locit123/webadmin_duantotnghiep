import { getType } from "../login/actions";
import { typeActionUpdatePassword } from "./actions";

export const initState = {
  isLoadingUpdatePassword: false,
  isErrorUpdatePassword: null,
  dataUpdatePassword: null,
};

const updatePasswordSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionUpdatePassword.fetchUpdatePasswordRequest):
      return {
        ...state,
        isLoadingUpdatePassword: true,
        isErrorUpdatePassword: null,
        dataUpdatePassword: null,
      };
    case getType(typeActionUpdatePassword.fetchUpdatePasswordSuccess):
      return {
        ...state,
        isLoadingUpdatePassword: false,
        isErrorUpdatePassword: null,
        dataUpdatePassword: action.payload,
      };
    case getType(typeActionUpdatePassword.fetchUpdatePasswordFailed):
      return {
        ...state,
        isLoadingUpdatePassword: false,
        isErrorUpdatePassword: action.payload,
        dataUpdatePassword: null,
      };

    default:
      return state;
  }
};

export default updatePasswordSlice;
