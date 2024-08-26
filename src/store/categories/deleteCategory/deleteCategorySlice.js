import { getType } from "../../auth/login/actions";
import { typeActionDeleteCategory } from "./actions";

export const initState = {
  isLoadingDeleteCategory: false,
  isErrorDeleteCategory: null,
  dataDeleteCategory: null,
};

const deleteCategorySlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionDeleteCategory.fetchDeleteCategoryRequest):
      return {
        ...state,
        isLoadingDeleteCategory: true,
        isErrorDeleteCategory: null,
        dataDeleteCategory: null,
      };
    case getType(typeActionDeleteCategory.fetchDeleteCategorySuccess):
      return {
        ...state,
        isLoadingDeleteCategory: false,
        isErrorDeleteCategory: null,
        dataDeleteCategory: action.payload,
      };
    case getType(typeActionDeleteCategory.fetchDeleteCategoryFailed):
      return {
        ...state,
        isLoadingDeleteCategory: false,
        isErrorDeleteCategory: action.payload,
        dataDeleteCategory: null,
      };

    default:
      return state;
  }
};

export default deleteCategorySlice;
