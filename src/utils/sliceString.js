import { useSelector } from "react-redux";
import { getLocationState } from "../store/selector";
import { NavLink, useLocation } from "react-router-dom";
import React from "react";
//---------------------QUAN LI BAN ONLINE--------------------
export const QuanLiBanOnlineSlice = () => {
  const locationHome = useSelector(getLocationState);

  let locationNameHome = locationHome.payload.slice(1, 5).toLocaleUpperCase();
  const location = useLocation();
  let locationPath = location.pathname.slice(0, 1);
  let viTriString1 = 4;
  let viTriString2 = 6;
  let viTriString3 = 9;
  let viTriString4 = 12;
  let viTriString5 = 18;

  let locationNameBanOline = location.pathname.slice(1, 19);
  let nameBanOnline =
    locationNameBanOline.slice(0, viTriString1) +
    " " +
    locationNameBanOline.slice(viTriString1, viTriString2) +
    " " +
    locationNameBanOline.slice(viTriString2, viTriString3) +
    " " +
    locationNameBanOline.slice(viTriString3, viTriString4) +
    " " +
    locationNameBanOline.slice(viTriString4, viTriString5);

  return (
    <>
      <h1 className="h1">Quản Lí Bàn Online</h1>
      <div className="content-location">
        <NavLink to={"/"} end className={"nav-link"}>
          {locationNameHome}
        </NavLink>
        <span>{` ${locationPath} ${nameBanOnline.toLocaleUpperCase()}`}</span>
      </div>
    </>
  );
};

//---------------------QUAN LI BAN--------------------
export const QuanLiBanSlice = () => {
  const locationHome = useSelector(getLocationState);
  let locationNameHome = locationHome.payload.slice(1, 5).toLocaleUpperCase();
  const location = useLocation();
  let locationPath = location.pathname.slice(0, 1);
  let viTriString1 = 4;
  let viTriString2 = 6;
  let viTriString3 = 9;
  let locationNameQuanLiBan = location.pathname.slice(1, 12);
  let nameQuanLiBan =
    locationNameQuanLiBan.slice(0, viTriString1) +
    " " +
    locationNameQuanLiBan.slice(viTriString1, viTriString2) +
    " " +
    locationNameQuanLiBan.slice(viTriString2, viTriString3);
  return (
    <>
      <h1 className="h1">Quản Lí Bàn</h1>
      <div className="content-location">
        <NavLink to={"/"} end className={"nav-link"}>
          {locationNameHome}
        </NavLink>
        <span>{` ${locationPath} ${nameQuanLiBan.toLocaleUpperCase()}`}</span>
      </div>
    </>
  );
};
//---------------------QUAN LI MENU --------------------

export const QuanLiMenuSlice = () => {
  const locationHome = useSelector(getLocationState);
  let locationNameHome = locationHome.payload.slice(1, 5).toLocaleUpperCase();
  const location = useLocation();
  let locationPath = location.pathname.slice(0, 1);
  let viTriString1 = 4;
  let viTriString2 = 6;
  let viTriString3 = 10;
  let locationNameQuanLiBan = location.pathname.slice(1, 13);
  let nameQuanLiBan =
    locationNameQuanLiBan.slice(0, viTriString1) +
    " " +
    locationNameQuanLiBan.slice(viTriString1, viTriString2) +
    " " +
    locationNameQuanLiBan.slice(viTriString2, viTriString3);
  return (
    <>
      <h1 className="h1">Quản Lí Menu</h1>
      <div className="content-location">
        <NavLink to={"/"} end className={"nav-link"}>
          {locationNameHome}
        </NavLink>
        <span>{` ${locationPath} ${nameQuanLiBan.toLocaleUpperCase()}`}</span>
      </div>
    </>
  );
};

//---------------------QUAN LI USER--------------------

export const QuanLiUserSlice = () => {
  const locationHome = useSelector(getLocationState);
  let locationNameHome = locationHome.payload.slice(1, 5).toLocaleUpperCase();
  const location = useLocation();
  let locationPath = location.pathname.slice(0, 1);
  let viTriString1 = 4;
  let viTriString2 = 6;
  let viTriString3 = 10;
  let locationNameUser = location.pathname.slice(1, 13);
  let nameUser =
    locationNameUser.slice(0, viTriString1) +
    " " +
    locationNameUser.slice(viTriString1, viTriString2) +
    " " +
    locationNameUser.slice(viTriString2, viTriString3);
  return (
    <>
      <h1 className="h1">Quản Lí Users</h1>
      <div className="content-location">
        <NavLink to={"/"} end className={"nav-link"}>
          {locationNameHome}
        </NavLink>
        <span>{` ${locationPath} ${nameUser.toLocaleUpperCase()}`}</span>
      </div>
    </>
  );
};
//---------------------QUAN LI THONG KE VA BAO CAO--------------------

export const QuanLiThongKeVaBaoCaoSlice = () => {
  const locationHome = useSelector(getLocationState);
  let locationNameHome = locationHome.payload.slice(1, 5).toLocaleUpperCase();
  const location = useLocation();
  let locationPath = location.pathname.slice(0, 1);
  let viTriString1 = 4;
  let viTriString2 = 6;
  let viTriString3 = 11;
  let viTriString4 = 13;

  let locationNameThongKe = location.pathname.slice(1, 14);
  let nameThongKe =
    locationNameThongKe.slice(0, viTriString1) +
    " " +
    locationNameThongKe.slice(viTriString1, viTriString2) +
    " " +
    locationNameThongKe.slice(viTriString2, viTriString3) +
    " " +
    locationNameThongKe.slice(viTriString3, viTriString4);

  return (
    <>
      <h1 className="h1">Quản Lí Thống Kê</h1>
      <div className="content-location">
        <NavLink to={"/"} end className={"nav-link"}>
          {locationNameHome}
        </NavLink>
        <span>{` ${locationPath} ${nameThongKe.toLocaleUpperCase()}`}</span>
      </div>
    </>
  );
};

//---------------------QUAN LI KHUYEN MAI--------------------
export const QuanLiKhuyenMaiSlice = () => {
  const locationHome = useSelector(getLocationState);
  let locationNameHome = locationHome.payload.slice(1, 5).toLocaleUpperCase();
  const location = useLocation();
  let locationPath = location.pathname.slice(0, 1);
  let viTriString1 = 4;
  let viTriString2 = 6;
  let viTriString3 = 12;
  let viTriString4 = 15;

  let locationNameKhuyenMai = location.pathname.slice(1, 16);
  let nameKhuyenMai =
    locationNameKhuyenMai.slice(0, viTriString1) +
    " " +
    locationNameKhuyenMai.slice(viTriString1, viTriString2) +
    " " +
    locationNameKhuyenMai.slice(viTriString2, viTriString3) +
    " " +
    locationNameKhuyenMai.slice(viTriString3, viTriString4);

  return (
    <>
      <h1 className="h1">Quản Lí Thống Kê</h1>
      <div className="content-location">
        <NavLink to={"/"} end className={"nav-link"}>
          {locationNameHome}
        </NavLink>
        <span>{` ${locationPath} ${nameKhuyenMai.toLocaleUpperCase()}`}</span>
      </div>
    </>
  );
};
