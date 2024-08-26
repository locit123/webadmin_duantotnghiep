import React, { useState } from "react";
import { Card } from "antd";
import "./CardProfileRight.scss";
import RenderProfileRight from "./renderProfileRight/RenderProfileRight";
import {
  CHANGE_PROFILE,
  EDIT_PROFILE,
  OVERVIEW,
} from "../../../utils/contants";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
const CardProfileRight = () => {
  console.log("render CardProfileRight");
  const theme = useSelector(getThemeState);
  const [changeTab, setChangeTab] = useState(OVERVIEW);

  return (
    <Card
      className={`card-profile2 ${theme ? "theme" : ""}`}
      title={
        <ul className="box-title">
          <li
            onClick={() => setChangeTab(OVERVIEW)}
            className={`li ${changeTab === OVERVIEW ? "click" : ""}`}
          >
            Tổng quan
          </li>
          <li
            onClick={() => setChangeTab(EDIT_PROFILE)}
            className={`li ${changeTab === EDIT_PROFILE ? "click" : ""}`}
          >
            Chỉnh sửa hồ sơ
          </li>
          <li
            onClick={() => setChangeTab(CHANGE_PROFILE)}
            className={`li ${changeTab === CHANGE_PROFILE ? "click" : ""}`}
          >
            Đổi mật khẩu
          </li>
        </ul>
      }
      bordered={false}
    >
      <RenderProfileRight changeTab={changeTab} />
    </Card>
  );
};

export default CardProfileRight;
