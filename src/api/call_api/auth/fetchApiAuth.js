import { setAccessToken } from "../../../store/accessToken/actions";
import { typeActionCreateUser } from "../../../store/auth/createUser/actions";
import { typeActionDeleteUser } from "../../../store/auth/deleteUser/actions";
import { typeActionForgotPassword } from "../../../store/auth/forgotPassword/actions";
import { typeActionGetMes } from "../../../store/auth/getMe/actions";
import { typeActionGetAllUsers } from "../../../store/auth/getUsers/actions";
import { typeActionLogins } from "../../../store/auth/login/actions";
import { typeActionResetPassword } from "../../../store/auth/resetPassword/actions";
import { typeActionUpdateMe } from "../../../store/auth/updateMe/actions";
import { typeActionUpdatePassword } from "../../../store/auth/updatePassword/actions";
import { valueFormUsers } from "../../../store/valueForm/users/actions";
import { api } from "../../AxiosInstall";
import { toast } from "react-toastify";
import NProgress from "nprogress";
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 300,
});
/******************************LOGIN***************************** */

const Login = async (payload, dispatch, navigate) => {
  dispatch(typeActionLogins.fetchRequest());
  NProgress.start();
  try {
    const res = await api.loginUser(payload);
    if (res?.data?.status) {
      NProgress.done();

      dispatch(typeActionLogins.fetchSuccess(res?.data?.data));
      dispatch(setAccessToken(res?.data?.data?.token));
      toast.success(res?.data?.status);
      dispatch(valueFormUsers.setEmail(""));
      dispatch(valueFormUsers.setPassword(""));
      navigate("/");
    }
  } catch (error) {
    NProgress.done();
    const message = error?.response?.data?.message;
    const status = error?.response?.data?.status;
    dispatch(typeActionLogins.fetchFailed(error));
    toast.error(message || status);
  }
};
/******************************GET ME***************************** */

const getMe = async (dispatch) => {
  dispatch(typeActionGetMes.fetchGetMeRequest());
  NProgress.start();
  try {
    const res = await api.getMe();
    if (res?.data?.status && res?.data?.data) {
      NProgress.done();
      dispatch(typeActionGetMes.fetchGetMeSuccess(res?.data?.data?.user));
    }
  } catch (error) {
    NProgress.done();
    dispatch(typeActionLogins.fetchFailed(error));
    toast.error(error?.response?.data?.status);
  }
};
/******************************GET ALL USERS***************************** */
const getAllUsers = async (dispatch) => {
  dispatch(typeActionGetAllUsers.fetchGetAllUsersRequest());
  NProgress.start();
  try {
    const res = await api.getUser();
    if (res?.data?.status) {
      NProgress.done();
      dispatch(typeActionGetAllUsers.fetchGetAllUsersSuccess(res?.data));
    }
  } catch (error) {
    NProgress.done();
    dispatch(typeActionGetAllUsers.fetchGetAllUsersFailed(error));
  }
};
/******************************CREATE USERS***************************** */
const postUser = async (dispatch, data, handleClose) => {
  dispatch(typeActionCreateUser.fetchCreateUserRequest());
  try {
    const res = await api.createUser(data);
    if (res?.data?.status) {
      toast.success(res?.data?.status);
      dispatch(typeActionCreateUser.fetchCreateUserSuccess(res?.data));
      handleClose();
      await getAllUsers(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionCreateUser.fetchCreateUserFailed(error));
    toast.error(message || status);
  }
};
/******************************UPDATE USERS***************************** */

const putMe = async (dispatch, data) => {
  dispatch(typeActionUpdateMe.fetchUpdateMeRequest());
  try {
    const res = await api.updateMe(data);
    if (res?.data?.status) {
      dispatch(typeActionUpdateMe.fetchUpdateMeSuccess(res?.data));
      await getMe(dispatch);
      toast.success(res?.data?.status);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionUpdateMe.fetchUpdateMeFailed(error));
    toast.error(message || status);
  }
};
/******************************DELETE USERS***************************** */
const destroyUser = async (dispatch, id, handleClose) => {
  dispatch(typeActionDeleteUser.fetchDeleteUserRequest());
  try {
    const res = await api.deleteUser(id);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.status);
      handleClose();
      await getAllUsers(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionDeleteUser.fetchDeleteUserFailed(error));
    toast.error(message || status);
  }
};
/******************************UPDATE CHANGE PASSWORD USERS***************************** */
const updatePassword = async (
  dispatch,
  currentPassword,
  newPassword,
  setCurrentPassword,
  setNewPassword,
  setReNewPassword,
  setIsEye,
  setIsEye2,
  setIsEye3
) => {
  dispatch(typeActionUpdatePassword.fetchUpdatePasswordRequest());
  NProgress.start();

  try {
    const res = await api.updatePassword(currentPassword, newPassword);
    if (res?.data?.status) {
      NProgress.done();
      dispatch(typeActionUpdatePassword.fetchUpdatePasswordSuccess(res?.data));
      toast.success(res?.data?.status);
      setCurrentPassword("");
      setNewPassword("");
      setReNewPassword("");
      setIsEye(false);
      setIsEye2(false);
      setIsEye3(false);
    }
  } catch (error) {
    NProgress.done();
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionUpdatePassword.fetchUpdatePasswordFailed(error));
    toast.error(message || status);
  }
};
/******************************Forgot Password***************************** */
const forgotPasswordAuth = async (dispatch, email, setEmail) => {
  dispatch(typeActionForgotPassword.fetchForgotPasswordRequest());
  NProgress.start();
  try {
    const res = await api.forgotPassword(email);
    if (res?.data?.status) {
      NProgress.done();
      toast.success(res?.data?.message);
      dispatch(typeActionForgotPassword.fetchForgotPasswordSuccess(res?.data));
      setEmail("");
    }
  } catch (error) {
    NProgress.done();
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionForgotPassword.fetchForgotPasswordFailed(error));
    toast.error(message || status);
  }
};
/******************************RESET PASSWORD***************************** */

const resetPasswordAuth = async (
  dispatch,
  token,
  newPassword,
  setNewPassword,
  setRePassword,
  navigate
) => {
  dispatch(typeActionResetPassword.fetchResetPasswordRequest());
  NProgress.start();
  try {
    const res = await api.resetPassword(token, newPassword);
    if (res?.data?.status) {
      NProgress.done();
      toast.success(res?.data?.message);
      dispatch(typeActionResetPassword.fetchResetPasswordSuccess(res?.data));
      setNewPassword("");
      setRePassword("");
      navigate("/login");
    }
  } catch (error) {
    NProgress.done();
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    dispatch(typeActionResetPassword.fetchResetPasswordFailed(error));
    toast.error(message || status);
  }
};

/******************************HISTORY PAYMENT***************************** */
const historyPaymentUser = async (id, setData) => {
  try {
    const res = await api.historyUser(id);
    if (res && res.data && res.data.status === "success") {
      setData(res.data.data);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(message || status);
  }
};

const postVerifyAuthentication = async (
  email,
  verificationCode,
  handleClose,
  dispatch
) => {
  try {
    const data = { email, verificationCode };
    const res = await api.verifyUser(data);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.message);
      handleClose();
      await getAllUsers(dispatch);
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(message || status);
  }
};

const postSendVerifyAuthentication = async (email, setSend, dispatch) => {
  try {
    const res = await api.sendVerifyUser(email);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.message);
      setSend(false);
      dispatch(valueFormUsers.setEmail(""));
    }
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(message || status);
  }
};
const patchUpdateUser = async (id, fullName, role, dispatch, handleClose) => {
  try {
    const data = { fullName, role };
    const res = await api.updateUser(id, data);
    if (res && res.data && res.data.status === "success") {
      toast.success(res.data.message);
      handleClose();
      await getAllUsers(dispatch);
    }
    console.log(res, "check role");
  } catch (error) {
    const status = error?.response?.data?.status;
    const message = error?.response?.data?.message;
    toast.error(message || status);
  }
};
export {
  Login,
  getMe,
  getAllUsers,
  postUser,
  putMe,
  destroyUser,
  updatePassword,
  forgotPasswordAuth,
  resetPasswordAuth,
  historyPaymentUser,
  postVerifyAuthentication,
  postSendVerifyAuthentication,
  patchUpdateUser,
};
