import React from "react";
import "./ReviewsUsers.scss";
import TableReviewsUsers from "./tableReviews/TableReviewsUsers";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { Helmet } from "react-helmet";
const ReviewsUsers = () => {
  const theme = useSelector(getThemeState);

  return (
    <div className={`layout-review-users ${theme ? "theme" : ""}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản Lý Đánh Giá - Ngon Restaurant</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <TableReviewsUsers />
    </div>
  );
};

export default ReviewsUsers;
