import { createActions } from "redux-actions";

export const valueFormUsers = createActions({
  setFullName: (payload) => payload,
  setEmail: (payload) => payload,
  setPassword: (payload) => payload,
  setRole: (payload) => payload,
  setFullNameUpdateMe: (payload) => payload,
  setAvatarUpdateMe: (payload) => payload,
  setCheckBox: (payload) => payload,
});
