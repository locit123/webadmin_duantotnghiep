import { getType } from "../../auth/login/actions";
import { typeActionCreateCategory } from "./actions";

export const initState = {
  isLoadingCreateCategory: false,
  isErrorCreateCategory: null,
  dataCreateCategory: null,
};

const createCategorySlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionCreateCategory.fetchCreateCategoryRequest):
      return {
        ...state,
        isLoadingCreateCategory: true,
        isErrorCreateCategory: null,
        dataCreateCategory: null,
      };
    case getType(typeActionCreateCategory.fetchCreateCategorySuccess):
      return {
        ...state,
        isLoadingCreateCategory: false,
        isErrorCreateCategory: null,
        dataCreateCategory: action.payload,
      };
    case getType(typeActionCreateCategory.fetchCreateCategoryFailed):
      return {
        ...state,
        isLoadingCreateCategory: false,
        isErrorCreateCategory: action.payload,
        dataCreateCategory: null,
      };

    default:
      return state;
  }
};

export default createCategorySlice;
