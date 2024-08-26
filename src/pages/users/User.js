import React, { useState } from "react";
import "./User.scss";
import TableUser from "../../components/tables/TableUsers/TableUser";
import { useDispatch, useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import ModalUsers from "../../components/Modal/Users/ModalUsers";
import { setStatusUsers } from "../../store/auth/setStatusUsers/actions";
import { valueFormUsers } from "../../store/valueForm/users/actions";

// Hàm viết hoa chữ cái đầu tiên
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const User = () => {
  console.log("render User");
  const [role, setRole] = useState("");
  const [show, setShow] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [send, setSend] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);

  const handleClickAddNewUser = () => {
    setShow(true);
    dispatch(setStatusUsers.setStatus(["create"]));
  };

  const handleClose = () => {
    setSend(false);
    setShow(false);
    dispatch(valueFormUsers.setFullName(""));
    dispatch(valueFormUsers.setEmail(""));
    dispatch(valueFormUsers.setPassword(""));
    dispatch(valueFormUsers.setRole("staff"));
    setVerifyCode("");
  };

  return (
    <div className={`layout-user ${theme ? "theme" : ""}`}>
      <button
        className="mx-3 btn btn-primary bt mt-3"
        onClick={handleClickAddNewUser}
      >
        Thêm Người Dùng
      </button>
      <ModalUsers
        verifyCode={verifyCode}
        show={show}
        handleClose={handleClose}
        setShow={setShow}
        setVerifyCode={setVerifyCode}
        setSend={setSend}
        send={send}
      />
      <TableUser
        role={role}
        setRole={setRole}
        capitalizeFirstLetter={capitalizeFirstLetter}
        setShow={setShow}
      />
    </div>
  );
};

export default React.memo(User);
