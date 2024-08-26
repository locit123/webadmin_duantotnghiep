import { toast } from "react-toastify";
import { typeActionMenuItem } from "../../../store/menuItem/getAllMenuItem/actions";
import { apiMenuItem } from "../../AxiosInstall";
import { typeActionCreateMenuItem } from "../../../store/menuItem/createMenuItem/actions";
import { valueFormMenu } from "../../../store/valueForm/menu/actions";
import { typeActionDeleteMenuItem } from "../../../store/menuItem/deleteMenuItem/actions";
import { typeActionUpdateMenuItem } from "../../../store/menuItem/updateMenuItem/actions";
import NProgress from "nprogress";
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 500,
});
const getAllMenuItem = async (dispatch) => {
  dispatch(typeActionMenuItem.fetchMenuItemRequest());
  try {
    const res = await apiMenuItem.getMenuItem();
    if (res?.data?.success) {
      dispatch(typeActionMenuItem.fetchMenuItemSuccess(res?.data));
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionMenuItem.fetchMenuItemFailed(error));
    toast.error(message || status);
  }
};

const postMenuItem = async (dispatch, data, setShow) => {
  dispatch(typeActionCreateMenuItem.fetchCreateMenuItemRequest());
  try {
    const res = await apiMenuItem.createMenuItem(data);
    if (res?.data?.status) {
      dispatch(typeActionCreateMenuItem.fetchCreateMenuItemSuccess(res?.data));
      toast.success(res?.data?.status);
      dispatch(valueFormMenu.setName(""));
      dispatch(valueFormMenu.setEngName(""));
      dispatch(valueFormMenu.setDescription(""));
      dispatch(valueFormMenu.setPrice(""));
      dispatch(valueFormMenu.setImage(""));
      dispatch(valueFormMenu.setCategoryId(""));
      dispatch(valueFormMenu.setOptions([]));
      setShow(false);
      await getAllMenuItem(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionCreateMenuItem.fetchCreateMenuItemFailed(error));
    toast.error(message || status);
  }
};

const destroyMenuItem = async (dispatch, id, setShow) => {
  dispatch(typeActionDeleteMenuItem.fetchDeleteMenuItemRequest());
  try {
    const res = await apiMenuItem.deleteMenuItem(id);
    if (res?.data?.status) {
      dispatch(typeActionDeleteMenuItem.fetchDeleteMenuItemSuccess(res?.data));
      toast.success(res?.data?.message);
      setShow(false);
      await getAllMenuItem(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionDeleteMenuItem.fetchDeleteMenuItemFailed(error));
    toast.error(message || status);
  }
};
const patchMenuItem = async (dispatch, id, data, setShow) => {
  dispatch(typeActionUpdateMenuItem.fetchUpdateMenuItemRequest());
  try {
    const res = await apiMenuItem.putMenuItem(id, data);

    if (res?.data?.status) {
      dispatch(typeActionUpdateMenuItem.fetchUpdateMenuItemSuccess(res?.data));
      toast.success(res?.data?.status);
      setShow(false);
      dispatch(valueFormMenu.setName(""));
      dispatch(valueFormMenu.setEngName(""));
      dispatch(valueFormMenu.setDescription(""));
      dispatch(valueFormMenu.setPrice(""));
      dispatch(valueFormMenu.setImage(""));
      dispatch(valueFormMenu.setCategoryId(""));
      dispatch(valueFormMenu.setOptions([]));
      await getAllMenuItem(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionUpdateMenuItem.fetchUpdateMenuItemFailed(error));
    toast.error(message || status);
  }
};
export { getAllMenuItem, postMenuItem, destroyMenuItem, patchMenuItem };
