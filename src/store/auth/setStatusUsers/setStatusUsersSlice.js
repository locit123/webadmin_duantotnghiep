import { getType } from "../login/actions";
import { setStatusUsers } from "./actions";

export const initState = {
  statusUsers: ["create"],
};

const setStatusUsersSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(setStatusUsers.setStatus):
      return {
        ...state,
        statusUsers: action.payload,
      };

    default:
      return state;
  }
};

export default setStatusUsersSlice;
