import React from "react";
import "./Review.scss";
import TableReview from "../../components/tables/TableReviews/TableReview";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const Review = (props) => {
  console.log("render Review");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-review ${theme ? "theme" : ""} `}>
      <div className="pt-3">
        <TableReview />
      </div>
    </div>
  );
};

export default React.memo(Review);
