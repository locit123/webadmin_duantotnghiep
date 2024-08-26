import { getType } from "../../auth/login/actions";
import { typeActionSetStatus } from "./actions";

export const initState = {
  status: ["create"],
};

const setStatusSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionSetStatus.setStatusTable):
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export default setStatusSlice;
