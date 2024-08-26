import { SHOW_LOCATION } from "../../utils/contants";

export const initState = {
  showLocation: [],
};

const locationSlice = (state = initState, action) => {
  switch (action.type) {
    case SHOW_LOCATION:
      return {
        ...state,
        showLocation: action.payload,
      };

    default:
      return state;
  }
};
export default locationSlice;
