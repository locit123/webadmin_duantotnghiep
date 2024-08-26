import React, { useCallback, useEffect } from "react";
import "./LoginForm.scss";
import "./RegisterForm.scss";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import FormRegisterUser from "./formRegisterUser/FormRegisterUser";
import { FloatButton } from "antd";
import { CaretUpOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { hideScrollTop, showScrollTop } from "../../store/scrollTop/actions";
import { getScrollState } from "../../store/selector";
const RegisterForm = (props) => {
  console.log("render RegisterForm");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const scroll = useSelector(getScrollState);
  const handleClickLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    console.log("useEffect RegisterForm");
    const handleScroll = () => {
      if (window.scrollY > 100) {
        return dispatch(showScrollTop());
      } else {
        return dispatch(hideScrollTop());
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch]);
  const handleClickScrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="content-login-from form-register">
      <div className="logo-title mb-3">
        <img src={logo} alt="logo" loading="lazy" />
        <h3>NiceAdmin</h3>
      </div>
      <div className="form-login">
        <div className="box-title">
          <h5 className="text-center">Tạo tài khoản</h5>
          <p className="text-center">
            Nhập thông tin cá nhân của bạn để tạo tài khoản
          </p>
        </div>
        <FormRegisterUser />
        <div className="text-footer mt-3">
          <span>Đã có tài khoản?</span>
          <span onClick={handleClickLogin}>Đăng nhập</span>
        </div>
      </div>
      {scroll && (
        <FloatButton
          onClick={handleClickScrollTop}
          icon={<CaretUpOutlined />}
          type="primary"
          style={{ right: 24 }}
        />
      )}
    </div>
  );
};

export default RegisterForm;
