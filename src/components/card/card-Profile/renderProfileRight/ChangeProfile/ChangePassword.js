import React, { useState } from "react";
import "./ChangePassword.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getThemeState,
  getUpdatePasswordState,
} from "../../../../../store/selector";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { updatePassword } from "../../../../../api/call_api/auth/fetchApiAuth";
const ChangePassword = () => {
  const theme = useSelector(getThemeState);
  const [isEye, setIsEye] = useState(false);
  const [isEye2, setIsEye2] = useState(false);
  const [isEye3, setIsEye3] = useState(false);
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");

  const getStateChangePassword = useSelector(getUpdatePasswordState);
  const { isLoadingUpdatePassword } = getStateChangePassword;
  console.log(getStateChangePassword, "[UPDATE PASSWORD]");
  const handleClickChangePassword = async () => {
    if (newPassword !== reNewPassword) {
      toast.warning("password không khớp!!!");
    } else {
      await updatePassword(
        dispatch,
        currentPassword,
        newPassword,
        setCurrentPassword,
        setNewPassword,
        setReNewPassword,
        setIsEye,
        setIsEye2,
        setIsEye3
      );
    }
  };
  return (
    <div className={`form-change-password ${theme ? "theme" : ""}`}>
      <div className="form-group">
        <p>Mật khẩu cũ</p>
        <div className="box-eye">
          <input
            className="form-control"
            placeholder="Nhập password cũ..."
            type={isEye ? "text" : "password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          {isEye ? (
            <EyeOutlined
              className="ic-none-eye"
              onClick={() => setIsEye(false)}
            />
          ) : (
            <EyeInvisibleOutlined
              className="ic-none-eye"
              onClick={() => setIsEye(true)}
            />
          )}
        </div>
      </div>
      <div className="form-group mt-3 mb-2">
        <p>Mật khẩu mới</p>
        <div className="box-eye">
          <input
            className="form-control"
            placeholder="Nhập password mới"
            type={isEye2 ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {isEye2 ? (
            <EyeOutlined
              className="ic-none-eye"
              onClick={() => setIsEye2(false)}
            />
          ) : (
            <EyeInvisibleOutlined
              className="ic-none-eye"
              onClick={() => setIsEye2(true)}
            />
          )}
        </div>
      </div>
      <div className="form-group">
        <p>Nhập lại mật khẩu mới</p>
        <div className="box-eye">
          <input
            className="form-control"
            placeholder="Nhập lại password mới"
            type={isEye3 ? "text" : "password"}
            value={reNewPassword}
            onChange={(e) => setReNewPassword(e.target.value)}
          />
          {isEye3 ? (
            <EyeOutlined
              className="ic-none-eye"
              onClick={() => setIsEye3(false)}
            />
          ) : (
            <EyeInvisibleOutlined
              className="ic-none-eye"
              onClick={() => setIsEye3(true)}
            />
          )}
        </div>
      </div>
      <div className="text-center mt-3 div">
        <button
          className="btn btn-primary bt2"
          onClick={handleClickChangePassword}
          disabled={isLoadingUpdatePassword ? true : false}
        >
          Đổi mật khẩu
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
