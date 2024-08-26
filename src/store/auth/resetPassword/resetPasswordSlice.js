import { getType } from "../login/actions";
import { typeActionResetPassword } from "./actions";

export const initState = {
  isLoadingResetPassword: false,
  isErrorResetPassword: null,
  dataResetPassword: null,
};

const resetPasswordSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionResetPassword.fetchResetPasswordRequest):
      return {
        ...state,
        isLoadingResetPassword: true,
        isErrorResetPassword: null,
        dataResetPassword: null,
      };
    case getType(typeActionResetPassword.fetchResetPasswordSuccess):
      return {
        ...state,
        isLoadingResetPassword: false,
        isErrorResetPassword: null,
        dataResetPassword: action.payload,
      };
    case getType(typeActionResetPassword.fetchResetPasswordFailed):
      return {
        ...state,
        isLoadingResetPassword: false,
        isErrorResetPassword: action.payload,
        dataResetPassword: null,
      };

    default:
      return state;
  }
};

export default resetPasswordSlice;
