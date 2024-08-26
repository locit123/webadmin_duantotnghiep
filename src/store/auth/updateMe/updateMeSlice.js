import { getType } from "../login/actions";
import { typeActionUpdateMe } from "./actions";

export const initState = {
  isLoadingUpdateMe: false,
  isErrorUpdateMe: null,
  dataUpdateMe: null,
};

const updateMeSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionUpdateMe.fetchUpdateMeRequest):
      return {
        ...state,
        isLoadingUpdateMe: true,
        isErrorUpdateMe: null,
        dataUpdateMe: null,
      };
    case getType(typeActionUpdateMe.fetchUpdateMeSuccess):
      return {
        ...state,
        isLoadingUpdateMe: false,
        isErrorUpdateMe: null,
        dataUpdateMe: action.payload,
      };
    case getType(typeActionUpdateMe.fetchUpdateMeFailed):
      return {
        ...state,
        isLoadingUpdateMe: false,
        isErrorUpdateMe: action.payload,
        dataUpdateMe: null,
      };

    default:
      return state;
  }
};

export default updateMeSlice;
