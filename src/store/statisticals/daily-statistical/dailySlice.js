import { SET_DAILY_STATISTICS } from "../../../utils/contants";

export const initState = {
  dataDaily: [],
};

const daiLySlice = (state = initState, action) => {
  switch (action.type) {
    case SET_DAILY_STATISTICS:
      return {
        ...state,
        dataDaily: action.payload,
      };

    default:
      return state;
  }
};

export default daiLySlice;
