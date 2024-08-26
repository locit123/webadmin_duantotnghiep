import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { valueFormUsers } from "../../../store/valueForm/users/actions";
import {
  emailState,
  fullNameState,
  getSetStatusUsersState,
  passwordState,
  roleState,
} from "../../../store/selector";
import { FloatingLabel, Form } from "react-bootstrap";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
const FormUser = () => {
  console.log("render FormUser");
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();
  const fullName = useSelector(fullNameState);
  const email = useSelector(emailState);
  const password = useSelector(passwordState);
  const role = useSelector(roleState);
  const getStatusUsers = useSelector(getSetStatusUsersState);
  const status = getStatusUsers[0];

  return (
    <div className="form-user">
      <FloatingLabel
        controlId="floatingInput"
        label="Họ và tên"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={fullName}
          onChange={(e) => dispatch(valueFormUsers.setFullName(e.target.value))}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="E-mail" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          onChange={(e) => dispatch(valueFormUsers.setEmail(e.target.value))}
          value={email}
          disabled={status === "update" ? true : false}
        />
      </FloatingLabel>
      <div className="form-eye">
        <FloatingLabel
          controlId="floatingInput"
          label="Mật khẩu"
          className="mb-3"
        >
          <Form.Control
            type={eye ? "text" : "password"}
            placeholder="name@example.com"
            value={password}
            onChange={(e) =>
              dispatch(valueFormUsers.setPassword(e.target.value))
            }
            disabled={status === "update" ? true : false}
          />
        </FloatingLabel>
        {eye ? (
          <TfiEye size={25} className="eye" onClick={() => setEye(false)} />
        ) : (
          <RxEyeClosed size={25} className="eye" onClick={() => setEye(true)} />
        )}
      </div>
      <FloatingLabel controlId="floatingSelect" label="Vai trò">
        <Form.Select
          aria-label="Floating label select example"
          onChange={(e) => dispatch(valueFormUsers.setRole(e.target.value))}
          value={role}
        >
          <option value={"staff"}>Nhân viên</option>
          <option value={"admin"}>Admin</option>
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default FormUser;
