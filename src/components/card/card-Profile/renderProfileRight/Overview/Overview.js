import React from "react";
import "./Overview.scss";
import { useSelector } from "react-redux";
import { getMeState, getThemeState } from "../../../../../store/selector";
const Overview = () => {
  console.log("render Overview");
  const theme = useSelector(getThemeState);
  const getMe = useSelector(getMeState);
  return (
    <div className={`layout-overview ${theme ? "theme" : ""}`}>
      <h5>Chi Tiết Hồ Sơ</h5>
      <div className="p">
        <p>Họ và tên</p>
        <p>{getMe?.isDataMe?.fullName || "Phùng Hưng"}</p>
      </div>
      <div className="p">
        <p>E-mail</p>
        <p>{getMe?.isDataMe?.email || "Phungloc6102003@gmail.com"}</p>
      </div>
      <div className="p">
        <p>Vai trò</p>
        <p>{getMe?.isDataMe?.role || "Admin"}</p>
      </div>
    </div>
  );
};

export default Overview;
