import React from "react";
import "./Review.scss";
import TableReview from "../../components/tables/TableReviews/TableReview";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { Helmet } from "react-helmet";
const Review = (props) => {
  console.log("render Review");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-review ${theme ? "theme" : ""} `}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản Lý Thông Báo - Ngon Restaurant</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="pt-3">
        <TableReview />
      </div>
    </div>
  );
};

export default React.memo(Review);
