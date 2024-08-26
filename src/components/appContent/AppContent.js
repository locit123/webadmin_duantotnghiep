import React from "react";
import { Layout } from "antd";
import Home from "../../pages/home";
import User from "../../pages/users/User";
import Review from "../../pages/reviews/Review";
import Promotion from "../../pages/promotions/Promotion";
import Order from "../../pages/orders/Order";
import Tables from "../../pages/tables/Tables";
import Login from "../../pages/login/Login";
import Menu from "../../pages/menu/Menu";
import Category from "../../pages/categories/Category";
import ErrorPage from "../../pages/error/ErrorPage";
import { Routes, Route } from "react-router-dom";
import Profile from "../../pages/profiles/Profile";
import {
  PublicNavigation,
  PrivateNavigation,
} from "../../components/navigation/Navigation";
import ForgotPassword from "../../pages/forgotPassword/ForgotPassword";
import ResetPassword from "../../pages/resetPassword/ResetPassword";
import RegisterForm from "../quanLiUsers/RegisterForm";
import Statistical from "../../pages/statistical/Statistical";
import ReviewsUsers from "../../pages/danhGia/ReviewsUsers";
const AppContent = () => {
  console.log("render App Content");

  const { Content } = Layout;

  return (
    <Content
      style={{
        margin: "0",
      }}
    >
      <div
        style={{
          minHeight: 360,
          background: "#f6f9ff",
          borderRadius: "#f6f9ff",
        }}
      >
        <Routes>
          <Route element={<PublicNavigation />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Route>
          <Route element={<PrivateNavigation />}>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<User />} />
            <Route path="/notification" element={<Review />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/order" element={<Order />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/statistical" element={<Statistical />} />
            <Route path="/reviews" element={<ReviewsUsers />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Content>
  );
};

export default React.memo(AppContent);
