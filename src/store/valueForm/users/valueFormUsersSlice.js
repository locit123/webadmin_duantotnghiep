import { getType } from "../../auth/login/actions";
import { valueFormUsers } from "./actions";

export const initState = {
  fullName: "",
  email: "",
  password: "",
  role: "client",
  fullNameUpdateMe: "",
  avatarUpdateMe: "",
  checkbox: false,
};

const valueFormUsersSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(valueFormUsers.setFullNameUpdateMe):
      return {
        ...state,
        fullNameUpdateMe: action.payload,
      };
    case getType(valueFormUsers.setAvatarUpdateMe):
      return {
        ...state,
        avatarUpdateMe: action.payload,
      };
    case getType(valueFormUsers.setFullName):
      return {
        ...state,
        fullName: action.payload,
      };
    case getType(valueFormUsers.setEmail):
      return {
        ...state,
        email: action.payload,
      };
    case getType(valueFormUsers.setPassword):
      return {
        ...state,
        password: action.payload,
      };
    case getType(valueFormUsers.setRole):
      return {
        ...state,
        role: action.payload,
      };
    case getType(valueFormUsers.setCheckBox):
      return {
        ...state,
        checkbox: action.payload,
      };

    default:
      return state;
  }
};

export default valueFormUsersSlice;
