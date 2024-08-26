import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAccessTokenState } from "../../store/selector";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Navigation.scss";
const PublicNavigation = () => {
  const accessToken = useSelector(getAccessTokenState);
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

const PrivateNavigation = () => {
  const accessToken = useSelector(getAccessTokenState);
  const refScroll = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (refScroll.current && refScroll.current._container) {
      refScroll.current._container.scrollTop = 0;
    }
  }, [location.pathname]);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="content-main">
      <PerfectScrollbar ref={refScroll}>
        <Outlet />
      </PerfectScrollbar>
    </div>
  );
};

export { PublicNavigation, PrivateNavigation };
