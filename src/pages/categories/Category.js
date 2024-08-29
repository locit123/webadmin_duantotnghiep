import React from "react";
import "./Category.scss";
import FromCategory from "../../components/form/formCategories/FromCategory";
import TableCategory from "../../components/tables/tableCategories/TableCategory";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { Helmet } from "react-helmet";
function Category(props) {
  console.log("render Category");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-category ${theme ? "theme" : ""}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản Lý Danh Mục - Ngon Restaurant</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <FromCategory />
      <TableCategory />
    </div>
  );
}

export default React.memo(Category);
