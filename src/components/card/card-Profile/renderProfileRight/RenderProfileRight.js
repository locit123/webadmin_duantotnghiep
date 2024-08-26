import React from "react";
import {
  CHANGE_PROFILE,
  EDIT_PROFILE,
  OVERVIEW,
} from "../../../../utils/contants";
import Overview from "./Overview/Overview";
import EditProfile from "./EditProfile/EditProfile";
import ChangePassword from "./ChangeProfile/ChangePassword";

const RenderProfileRight = ({ changeTab }) => {
  console.log("render RenderProfileRight");
  switch (changeTab) {
    case OVERVIEW:
      return <Overview />;
    case EDIT_PROFILE:
      return <EditProfile />;
    case CHANGE_PROFILE:
      return <ChangePassword />;

    default:
      return OVERVIEW;
  }
};

export default RenderProfileRight;
