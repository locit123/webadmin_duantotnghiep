import React from "react";
import "./Profile.scss";
import CardProfileLeft from "../../components/card/card-Profile/CardProfileLeft";
import CardProfileRight from "../../components/card/card-Profile/CardProfileRight";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const Profile = () => {
  console.log("render Profile");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-profile ${theme ? "theme" : ""}`}>
      <h1 className="text-h1 mb-3">Thông tin cá nhân</h1>
      <div className="card-profile">
        <div className="card-profile-left">
          <CardProfileLeft />
        </div>
        <div className="card-profile-right">
          <CardProfileRight />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
