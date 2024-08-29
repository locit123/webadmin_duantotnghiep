import React from "react";
import "./Order.scss";
import TableOrder from "../../components/tables/tableOrders/TableOrder";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import ConfirmTheDish from "../../components/orders/ConfirmTheDish";
import { Helmet } from "react-helmet";

function Order(props) {
  console.log("render Order");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-order ${theme ? "theme" : ""}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Quản Lý Hóa Đơn - Ngon Restaurant</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <ConfirmTheDish />
      <TableOrder />
    </div>
  );
}

export default React.memo(Order);
