import { SET_ACCESS_TOKEN } from "../../utils/contants";

export const initState = {
  getAccessToken: "",
};

const accessTokenSlice = (state = initState, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      return {
        ...state,
        getAccessToken: action.payload,
      };

    default:
      return state;
  }
};

export default accessTokenSlice;
