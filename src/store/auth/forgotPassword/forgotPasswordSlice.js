import { getType } from "../login/actions";
import { typeActionForgotPassword } from "./actions";

export const initState = {
  isLoadingForgotPassword: false,
  isErrorForgotPassword: null,
  dataForgotPassword: null,
};

const forgotPasswordSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionForgotPassword.fetchForgotPasswordRequest):
      return {
        ...state,
        isLoadingForgotPassword: true,
        isErrorForgotPassword: null,
        dataForgotPassword: null,
      };
    case getType(typeActionForgotPassword.fetchForgotPasswordSuccess):
      return {
        ...state,
        isLoadingForgotPassword: false,
        isErrorForgotPassword: null,
        dataForgotPassword: action.payload,
      };
    case getType(typeActionForgotPassword.fetchForgotPasswordFailed):
      return {
        ...state,
        isLoadingForgotPassword: false,
        isErrorForgotPassword: action.payload,
        dataForgotPassword: null,
      };

    default:
      return state;
  }
};
export default forgotPasswordSlice;
