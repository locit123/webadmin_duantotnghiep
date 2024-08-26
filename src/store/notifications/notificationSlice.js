import { getType } from "../auth/login/actions";
import { typeActionNotificationValues } from "./actionsNotification";

export const initState = {
  title: "",
  content: "",
  summary: "",
  images: [],
};

const notificationSlice = (state = initState, action) => {
  switch (action.type) {
    case getType(typeActionNotificationValues.setTitle):
      return {
        ...state,
        title: action.payload,
      };
    case getType(typeActionNotificationValues.setContent):
      return {
        ...state,
        content: action.payload,
      };
    case getType(typeActionNotificationValues.setImage):
      return {
        ...state,
        images: action.payload,
      };
    case getType(typeActionNotificationValues.setSummary):
      return {
        ...state,
        summary: action.payload,
      };

    default:
      return state;
  }
};

export default notificationSlice;
