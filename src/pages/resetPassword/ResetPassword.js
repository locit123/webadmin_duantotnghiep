import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPasswordAuth } from "../../api/call_api/auth/fetchApiAuth";
import { useDispatch, useSelector } from "react-redux";
import "./ReserPassword.scss";
import { resetPasswordState } from "../../store/selector";
import {
  LoadingOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const ResetPassword = () => {
  const token = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [eyeNewPassword, setEyeNewPassword] = useState(false);
  const [eyeRePassword, setEyeRePassword] = useState(false);
  const dataResetPassword = useSelector(resetPasswordState);
  const { isLoadingResetPassword } = dataResetPassword;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickResetPassword = async (e) => {
    e.preventDefault();
    if (reNewPassword !== newPassword) {
      toast.warning("password not found");
    } else {
      await resetPasswordAuth(
        dispatch,
        token.token,
        newPassword,
        setNewPassword,
        setReNewPassword,
        navigate
      );
    }
  };
  return (
    <div className="form-reset-password">
      <div className="form">
        <h1>Nhập mật khẩu mới của bạn</h1>
        <div className="form-group">
          <label className="mb-1">Mật khẩu mới</label>
          <div className="box-eye">
            <input
              type={eyeNewPassword ? "text" : "password"}
              placeholder="Nhập mật khẩu mới"
              className="form-control"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {eyeNewPassword ? (
              <EyeOutlined
                onClick={() => setEyeNewPassword(false)}
                className="ic-none"
              />
            ) : (
              <EyeInvisibleOutlined
                className="ic-none"
                onClick={() => setEyeNewPassword(true)}
              />
            )}
          </div>
        </div>
        <div className="form-group mt-2 mb-2">
          <label className="mb-1">Nhập lại mật khẩu</label>
          <div className="box-eye">
            <input
              type={eyeRePassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              className="form-control"
              onChange={(e) => setReNewPassword(e.target.value)}
            />
            {eyeRePassword ? (
              <EyeOutlined
                onClick={() => setEyeRePassword(false)}
                className="ic-none"
              />
            ) : (
              <EyeInvisibleOutlined
                className="ic-none"
                onClick={() => setEyeRePassword(true)}
              />
            )}
          </div>
        </div>
        <div className="bt">
          <button
            className="btn btn-primary"
            onClick={handleClickResetPassword}
          >
            {isLoadingResetPassword ? <LoadingOutlined /> : "Xác Nhận"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
