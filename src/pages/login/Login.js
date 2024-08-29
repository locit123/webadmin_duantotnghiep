import React from "react";
import LoginFrom from "../../components/quanLiUsers/LoginFrom";
import { Helmet } from "react-helmet";

function Login() {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Đăng Nhập - Ngon Restaurant</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <LoginFrom />
    </div>
  );
}

export default Login;
