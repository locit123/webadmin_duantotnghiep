import React from "react";
import "./LoginForm.scss";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import FormLoginUser from "./formLoginUser/FormLoginUser";

const LoginFrom = (props) => {
  console.log("render LoginFrom");

  const navigate = useNavigate();

  const handleClickRegister = () => {
    navigate("/register");
  };
  return (
    <div className="content-login-from">
      <div className="logo-title mb-3">
        <img src={logo} alt="logo" loading="lazy" />
        <h3>NiceAdmin</h3>
      </div>
      <div className="form-login">
        <div className="box-title">
          <h5 className="text-center">Đăng nhập vào Tài khoản của bạn</h5>
          <p className="text-center">Nhập số e-mail và mật khẩu để đăng nhập</p>
        </div>
        <FormLoginUser />
        <div className="text-footer mt-3">
          <span>Không có tài khoản?</span>
          <span onClick={handleClickRegister}>Tạo một tài khoản</span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoginFrom);
