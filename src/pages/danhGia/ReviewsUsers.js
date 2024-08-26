import React from "react";
import "./ReviewsUsers.scss";
import TableReviewsUsers from "./tableReviews/TableReviewsUsers";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const ReviewsUsers = () => {
  const theme = useSelector(getThemeState);

  return (
    <div className={`layout-review-users ${theme ? "theme" : ""}`}>
      <TableReviewsUsers />
    </div>
  );
};

export default ReviewsUsers;
