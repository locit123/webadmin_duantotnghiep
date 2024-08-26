import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  HomeFilled,
  UserOutlined,
  TagFilled,
  DropboxSquareFilled,
  BoxPlotFilled,
  SettingFilled,
  ShopFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellFilled,
} from "@ant-design/icons";
import "./SiderMenu.scss";
import { Layout, Menu, Button } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
const SiderMenu = () => {
  console.log("render SiderMenu");
  const { Sider } = Layout;
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector(getThemeState);
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  // Check screen size and adjust collapsed state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize(); // Initial check

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = useMemo(
    () => [
      {
        className: "item-menu",
        key: "/",
        icon: (
          <HomeFilled className="item-icon" onClick={() => handleClick("/")} />
        ),
        label: (
          <Link to="/" className={`item-link ${collapsed ? "collapsed" : ""}`}>
            Home
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/users",
        icon: (
          <UserOutlined
            className="item-icon"
            onClick={() => handleClick("/users")}
          />
        ),
        label: (
          <Link
            to="/users"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý người dùng
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/notification",
        icon: (
          <BellFilled
            className="item-icon"
            onClick={() => handleClick("/notification")}
          />
        ),
        label: (
          <Link
            to="/notification"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý thông báo
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/promotions",
        icon: (
          <TagFilled
            className="item-icon"
            onClick={() => handleClick("/promotions")}
          />
        ),
        label: (
          <Link
            to="/promotions"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý khuyến mãi
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/order",
        icon: (
          <DropboxSquareFilled
            className="item-icon"
            onClick={() => handleClick("/order")}
          />
        ),
        label: (
          <Link
            to="/order"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý hóa đơn
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/tables",
        icon: (
          <BoxPlotFilled
            className="item-icon"
            onClick={() => handleClick("/tables")}
          />
        ),
        label: (
          <Link
            to="/tables"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý bàn
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/menu",
        icon: (
          <ShopFilled
            className="item-icon"
            onClick={() => handleClick("/menu")}
          />
        ),
        label: (
          <Link
            to="/menu"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý thực đơn
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/categories",
        icon: (
          <SettingFilled
            className="item-icon"
            onClick={() => handleClick("/categories")}
          />
        ),
        label: (
          <Link
            to="/categories"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý danh mục
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/statistical",
        icon: (
          <IoStatsChartSharp
            className="item-icon"
            onClick={() => handleClick("/statistical")}
          />
        ),
        label: (
          <Link
            to="/statistical"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý thống kê
          </Link>
        ),
      },
      {
        className: "item-menu",
        key: "/reviews",
        icon: (
          <FaStar
            className="item-icon"
            onClick={() => handleClick("/reviews")}
          />
        ),
        label: (
          <Link
            to="/reviews"
            className={`item-link ${collapsed ? "collapsed" : ""}`}
          >
            Quản lý đánh giá
          </Link>
        ),
      },
    ],
    [collapsed, handleClick] // Updated dependencies
  );

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      className={`custom-sider ${collapsed ? "collapsed" : ""}`}
      style={{ background: theme ? "#1e1e2e" : "#f9fafc" }}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      width={200}
      trigger={null} // Disable default trigger
    >
      <div className="toggle-button">
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        className={`menu ${theme ? "theme" : ""}`}
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        selectedKeys={[location.pathname]}
        items={items}
      />
    </Sider>
  );
};

export default React.memo(SiderMenu);
