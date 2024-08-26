import React from "react";
import "./Category.scss";
import FromCategory from "../../components/form/formCategories/FromCategory";
import TableCategory from "../../components/tables/tableCategories/TableCategory";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
function Category(props) {
  console.log("render Category");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-category ${theme ? "theme" : ""}`}>
      <FromCategory />
      <TableCategory />
    </div>
  );
}

export default React.memo(Category);
