import { getType } from "../../auth/login/actions";
import { valueFormMenu } from "./actions";

export const initState = {
  getName: "",
  getEngName: "",
  getDescription: "",
  getPrice: "",
  getImage: "",
  getCategoryId: "",
  getOptions: [],
};

const valueFormMenuSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(valueFormMenu.setName):
      return {
        ...state,
        getName: action.payload,
      };
    case getType(valueFormMenu.setEngName):
      return {
        ...state,
        getEngName: action.payload,
      };
    case getType(valueFormMenu.setDescription):
      return {
        ...state,
        getDescription: action.payload,
      };
    case getType(valueFormMenu.setPrice):
      return {
        ...state,
        getPrice: action.payload,
      };
    case getType(valueFormMenu.setImage):
      return {
        ...state,
        getImage: action.payload,
      };
    case getType(valueFormMenu.setCategoryId):
      return {
        ...state,
        getCategoryId: action.payload,
      };
    case getType(valueFormMenu.setOptions):
      return {
        ...state,
        getOptions: action.payload,
      };

    default:
      return state;
  }
};

export default valueFormMenuSlice;
