import React, { useState } from "react";
import "lightbox.js-react/dist/index.css";
import "./FormRegister.scss";
import { api } from "../../../api/AxiosInstall";
import { toast } from "react-toastify";
const FormRegisterUser = (props) => {
  console.log("render FormRegisterUser");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickRegister = async () => {
    try {
      const data = { fullName, email, password };
      const res = await api.createUser(data);
      if (res && res.data && res.data.status === "success") {
        toast.success(res.data.message);
        setEmail("");
        setPassword("");
        setFullName("");
      }
    } catch (error) {
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(message || status);
    }
  };
  return (
    <div>
      <div className="form-group mb-3">
        <label className="mb-2">Full Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Nhập full name"
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
      <div className="text-center button mt-3">
        <button className="btn btn-primary" onClick={handleClickRegister}>
          Đăng ký
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormRegisterUser);
