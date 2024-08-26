import React from "react";
import "./Order.scss";
import TableOrder from "../../components/tables/tableOrders/TableOrder";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import ConfirmTheDish from "../../components/orders/ConfirmTheDish";

function Order(props) {
  console.log("render Order");
  const theme = useSelector(getThemeState);
  return (
    <div className={`layout-order ${theme ? "theme" : ""}`}>
      <ConfirmTheDish />
      <TableOrder />
    </div>
  );
}

export default React.memo(Order);
