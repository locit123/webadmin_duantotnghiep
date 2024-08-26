import { getType } from "../../auth/login/actions";
import { typeActionGetOrderByTableId } from "./actions";

export const initState = {
  isLoadingOrderByTableId: false,
  isErrorOrderByTableId: null,
  dataOrderByTableId: null,
};

const orderByTableIdSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionGetOrderByTableId.fetchGetOrderByTableIdRequest):
      return {
        isLoadingOrderByTableId: true,
        isErrorOrderByTableId: null,
        dataOrderByTableId: null,
      };
    case getType(typeActionGetOrderByTableId.fetchGetOrderByTableIdSuccess):
      return {
        isLoadingOrderByTableId: false,
        isErrorOrderByTableId: null,
        dataOrderByTableId: action.payload,
      };
    case getType(typeActionGetOrderByTableId.fetchGetOrderByTableIdFailed):
      return {
        isLoadingOrderByTableId: true,
        isErrorOrderByTableId: action.payload,
        dataOrderByTableId: null,
      };

    default:
      return state;
  }
};

export default orderByTableIdSlice;
