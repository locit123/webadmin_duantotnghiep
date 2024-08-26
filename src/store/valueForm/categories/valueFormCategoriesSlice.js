import { getType } from "../../auth/login/actions";
import { valueFormCategories } from "./actions";

export const initState = {
  name: "",
};

const valueFormCategoriesSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(valueFormCategories.setName):
      return {
        ...state,
        name: action.payload,
      };

    default:
      return state;
  }
};

export default valueFormCategoriesSlice;
