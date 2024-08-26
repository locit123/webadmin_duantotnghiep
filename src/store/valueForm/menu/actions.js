import { createActions } from "redux-actions";

export const valueFormMenu = createActions({
  setName: (payload) => payload,
  setEngName: (payload) => payload,
  setDescription: (payload) => payload,
  setPrice: (payload) => payload,
  setImage: (payload) => payload,
  setCategoryId: (payload) => payload,
  setOptions: (payload) => payload,
});
