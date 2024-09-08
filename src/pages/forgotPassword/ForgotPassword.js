import React, { useState } from "react";
import "./ForgotPassword.scss";
import { forgotPasswordAuth } from "../../api/call_api/auth/fetchApiAuth";
import { useDispatch, useSelector } from "react-redux";
import { dataForgotPasswordState } from "../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>Lấy lại mật khẩu - Ngon Restaurant</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="form">
        <h1>Nhập email của bạn để đặt lại mật khẩu</h1>
        <div className="form-group mt-3 mb-3">
          <label className="mb-2">E-mail</label>
          <input
            value={email}
            onChange={handleChangePassword}
            placeholder="Nhập email của bạn"
            className="form-control"
          />
        </div>
        <div className="bt">
          <button
            className="btn btn-primary"
            onClick={handleClickResetPassword}
          >
            {isLoadingForgotPassword ? <LoadingOutlined /> : "Tiếp tục"}
          </button>
        </div>
        <div className="text-center mt-1">
          <Link to={"/login"} style={{ color: "#E8900C" }}>
            Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
