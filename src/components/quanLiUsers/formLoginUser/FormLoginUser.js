import React, { useRef, useState } from "react";
import { Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  emailState,
  getLoginState,
  passwordState,
} from "../../../store/selector";
import {
  EyeOutlined,
  LoadingOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Login } from "../../../api/call_api/auth/fetchApiAuth";
import { Link, useNavigate } from "react-router-dom";
import "./FormLoginUser.scss";
import { valueFormUsers } from "../../../store/valueForm/users/actions";
const FormLoginUser = (props) => {
  console.log("render FormLoginUser");
  const [isEye, setIsEye] = useState(false);
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const dispatch = useDispatch();
  const input1 = useRef();
  const login = useSelector(getLoginState);
  const { isLoading } = login;
  const navigate = useNavigate();

  const handleClickLogin = async (e) => {
    e.preventDefault();
    const payload = { email, password };
    await Login(payload, dispatch, navigate);
  };

  const handleCheckBox = (e) => {
    if (e.target.checked) {
      dispatch(valueFormUsers.setEmail("phungloc6102003@gmail.com"));
      dispatch(valueFormUsers.setPassword("123456Tri"));
    }
  };
  return (
    <div>
      <div className="form-group mb-3">
        <label className="mb-2">E-mail</label>
        <input
          ref={input1}
          type="email"
          className="form-control"
          placeholder="Nhập e-mail"
          value={email}
          onChange={(e) => dispatch(valueFormUsers.setEmail(e.target.value))}
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">Mật khẩu</label>
        <div className="box-ip-ic">
          <input
            type={isEye ? "text" : "password"}
            className="form-control"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) =>
              dispatch(valueFormUsers.setPassword(e.target.value))
            }
          />
          {isEye ? (
            <EyeOutlined className="icon-eye" onClick={() => setIsEye(false)} />
          ) : (
            <EyeInvisibleOutlined
              className="icon-eye"
              onClick={() => setIsEye(true)}
            />
          )}
        </div>
      </div>
      <div className="form-group box-forgot-password">
        <Checkbox className="text-checkbox" onChange={handleCheckBox}>
          Ghi nhớ mật khẩu
        </Checkbox>
        <Link className="link" to={"/forgot-password"}>
          Quên mật khẩu?
        </Link>
      </div>
      <div className="text-center button mt-3">
        <button onClick={handleClickLogin} className="btn btn-primary">
          {isLoading ? <LoadingOutlined /> : "Đăng nhập"}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormLoginUser);
