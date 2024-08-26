import { STATISTICAL_PAYMENT } from "../../../utils/contants";

const initState = {
  dataPayment: [],
};

const dataStatisticalSlice = (state = initState, action) => {
  switch (action.type) {
    case STATISTICAL_PAYMENT:
      return {
        ...state,
        dataPayment: action.payload,
      };

    default:
      return state;
  }
};

export default dataStatisticalSlice;
