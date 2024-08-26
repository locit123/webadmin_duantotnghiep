import React, { useState } from "react";
import "./ForgotPassword.scss";
import { forgotPasswordAuth } from "../../api/call_api/auth/fetchApiAuth";
import { useDispatch, useSelector } from "react-redux";
import { dataForgotPasswordState } from "../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dataForgot = useSelector(dataForgotPasswordState);
  const { isLoadingForgotPassword } = dataForgot;
  const dispatch = useDispatch();
  const handleChangePassword = (e) => {
    setEmail(e.target.value);
  };
  const handleClickResetPassword = async (e) => {
    e.preventDefault();
    await forgotPasswordAuth(dispatch, email, setEmail);
  };
  return (
    <div className="forgot-password">
      <div className="form">
        <h1>Enter your email to reset password</h1>
        <div className="form-group mt-3 mb-3">
          <label className="mb-2">Email</label>
          <input
            value={email}
            onChange={handleChangePassword}
            placeholder="enter your email"
            className="form-control"
          />
        </div>
        <div className="bt">
          <button
            className="btn btn-primary"
            onClick={handleClickResetPassword}
          >
            {isLoadingForgotPassword ? <LoadingOutlined /> : "Reset Password"}
          </button>
        </div>
        <div className="text-center mt-1">
          <Link to={"/login"} style={{ color: "#E8900C" }}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
