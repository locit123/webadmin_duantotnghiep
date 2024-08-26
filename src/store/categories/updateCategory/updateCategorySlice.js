import { getType } from "../../auth/login/actions";
import { typeActionUpdateCategory } from "./actions";

export const initState = {
  isLoadingUpdateCategory: false,
  isErrorUpdateCategory: null,
  dataUpdateCategory: null,
};

const updateCategorySlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionUpdateCategory.fetchUpdateCategoryRequest):
      return {
        ...state,
        isLoadingUpdateCategory: true,
        isErrorUpdateCategory: null,
        dataUpdateCategory: null,
      };
    case getType(typeActionUpdateCategory.fetchUpdateCategorySuccess):
      return {
        ...state,
        isLoadingUpdateCategory: false,
        isErrorUpdateCategory: null,
        dataUpdateCategory: action.payload,
      };
    case getType(typeActionUpdateCategory.fetchUpdateCategoryFailed):
      return {
        ...state,
        isLoadingUpdateCategory: false,
        isErrorUpdateCategory: action.payload,
        dataUpdateCategory: null,
      };

    default:
      return state;
  }
};

export default updateCategorySlice;
