import { getType } from "../../auth/login/actions";
import { typeActionGetCategories } from "./actions";

export const initState = {
  isLoadingGetCategories: false,
  isErrorGetCategories: null,
  dataGetCategories: null,
};

const categoriesSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetCategories.fetchGetCategoriesRequest):
      return {
        ...state,
        isLoadingGetCategories: true,
        isErrorGetCategories: null,
        dataGetCategories: null,
      };
    case getType(typeActionGetCategories.fetchGetCategoriesSuccess):
      return {
        ...state,
        isLoadingGetCategories: false,
        isErrorGetCategories: null,
        dataGetCategories: action.payload,
      };
    case getType(typeActionGetCategories.fetchGetCategoriesFailed):
      return {
        ...state,
        isLoadingGetCategories: false,
        isErrorGetCategories: action.payload,
        dataGetCategories: null,
      };

    default:
      return state;
  }
};

export default categoriesSlice;
