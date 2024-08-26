import { getType } from "../../auth/login/actions";
import { setStatusCategories } from "./actions";

export const initState = {
  dataStatus: ["create"],
};

const setStatusSliceCategorySlice = (state = initState, action) => {
  switch (action.type) {
    case getType(setStatusCategories.setStatus):
      return {
        ...state,
        dataStatus: action.payload,
      };

    default:
      return state;
  }
};

export default setStatusSliceCategorySlice;
