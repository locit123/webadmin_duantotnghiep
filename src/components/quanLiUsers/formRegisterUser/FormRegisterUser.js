import React, { useState } from "react";
import "lightbox.js-react/dist/index.css";
import "./FormRegister.scss";
import { api } from "../../../api/AxiosInstall";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const FormRegisterUser = (props) => {
  console.log("render FormRegisterUser");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClickRegister = async () => {
    try {
      setIsLoading(true);
      const data = { fullName, email, password, role };
      const res = await api.createUser(data);
      if (res && res.data && res.data.status === "success") {
        setIsLoading(false);
        toast.success(res.data.message);
        setEmail("");
        setPassword("");
        setFullName("");
        setRole("admin");
        navigate("/login");
      }
    } catch (error) {
      setIsLoading(false);
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(message || status);
    }
  };
  return (
    <div>
      <div className="form-group mb-3">
        <label className="mb-2">Họ và tên</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">E-mail</label>
        <input
          type="email"
          value={email}
          className="form-control"
          placeholder="Nhập e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mb-3">
        <label className="mb-2">Mật khẩu</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Nhập mật khẩu..."
        />
      </div>
      <div className="form-group mb-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setRole(e.target.value)}
          className="form-control"
          placeholder="Nhập mật khẩu..."
          hidden
        />
      </div>
      <div className="text-center button mt-3">
        <button
          className="btn btn-primary"
          onClick={handleClickRegister}
          disabled={isLoading ? true : false}
        >
          {isLoading ? <LoadingOutlined /> : `Đăng ký`}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormRegisterUser);
