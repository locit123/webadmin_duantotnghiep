import React, { useCallback, useEffect, useRef, useState } from "react";
import { Layout } from "antd";
import "./AppHeader.scss";
import { Avatar, Space, Col, Row } from "antd";
import {
  CaretDownOutlined,
  SunFilled,
  MoonFilled,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import avatar from "../../images/messages-1.jpg";
import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { getMeState, getThemeState } from "../../store/selector";
import { setHideTheme, setShowTheme } from "../../store/theme/actions";
import { Link } from "react-router-dom";
import { setAccessToken } from "../../store/accessToken/actions";
import { getMe } from "../../api/call_api/auth/fetchApiAuth";

const AppHeader = () => {
  console.log("render App Header");
  const [dropdown, setDropdown] = useState(true);
  const { Header } = Layout;
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const getMeNeState = useSelector(getMeState);
  const { isDataMe } = getMeNeState;

  const fetchGetMe = useCallback(async () => {
    await getMe(dispatch);
  }, [dispatch]);

  useEffect(() => {
    fetchGetMe();
  }, [fetchGetMe]);
  const menuRef = useRef(null);
  const handleClickDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleMouseDown = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    if (dropdown) {
      window.addEventListener("mousedown", handleMouseDown);
    } else {
      window.removeEventListener("mousedown", handleMouseDown);
    }
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [dropdown]);

  const handleClickLogout = () => {
    dispatch(setAccessToken(""));
  };
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: theme ? " #1e1e2e" : "#fff",
        }}
      >
        <Row
          justify={"space-between"}
          align={"middle"}
          className={`Row ${theme ? "theme" : ""}`}
        >
          <Col flex={"auto"} style={{ flex: "2" }} className={`left-col`}>
            <Space size={12}>
              <img src={logo} alt="logo" className="img" loading="lazy" />
              <span className="nice-admin">Nice Admin</span>
            </Space>
          </Col>
          <Col flex="auto" className="right-col">
            <Space size={10} wrap>
              {theme ? (
                <MoonFilled
                  className="icon-moon"
                  onClick={() => dispatch(setHideTheme())}
                />
              ) : (
                <SunFilled
                  className="icon-sun"
                  onClick={() => dispatch(setShowTheme())}
                />
              )}
              <div className="item-box" onClick={handleClickDropdown}>
                <Avatar
                  size={36}
                  src={
                    <img
                      src={isDataMe?.img_avatar_url || avatar}
                      alt="avatar"
                    />
                  }
                />
                <div className="item-span">
                  <span>{`xin chào : ${
                    isDataMe?.fullName || "Tên Demo"
                  }`}</span>
                  <CaretDownOutlined />
                </div>
              </div>
            </Space>
          </Col>
        </Row>
      </Header>
      {dropdown && (
        <div className={`menu-header ${theme ? "theme" : ""}`} ref={menuRef}>
          <ul>
            <li className="menu-name">
              {" "}
              {` ${isDataMe?.fullName || "Tên Demo"}`}
            </li>
            <li className="item-profile">
              <Link to={"/profile"} className="item-link">
                <UserOutlined className="item-icon" />
                <span>Thông tin của tôi</span>
              </Link>
            </li>
            <li onClick={handleClickLogout}>
              <Link className="item-link">
                <LogoutOutlined className="item-icon" /> <span>Đăng xuất</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default AppHeader;
