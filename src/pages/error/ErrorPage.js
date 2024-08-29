import React from "react";
import "./ErrorPage.scss";
import { NavLink } from "react-router-dom";
const ErrorPage = (props) => {
  return (
    <div style={{ paddingTop: "100px" }} className="content-error-page">
      <h2 className="text-center">Trang bạn đang tìm kiếm không tồn tại.</h2>
      <div className="text-center">
        <NavLink to={"/"} end>
          <button>Quay lại trang chủ</button>
        </NavLink>
      </div>
      <div className="img ">
        <img
          src="https://img.lovepik.com/photo/45007/5339.jpg_wh860.jpg"
          alt="not-found"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
