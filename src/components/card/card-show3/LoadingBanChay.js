import React from "react";
import { FormatDay2 } from "../../../utils/FormDay";

const LoadingBanChay = ({ item, index }) => {
  return (
    <tr>
      <td>{index + 1}</td>
      <td className="text-mt">{item.name}</td>
      <td>{item.totalQuantity}</td>
      <td className="text-da-ban">{FormatDay2(item.timePeriod)}</td>
    </tr>
  );
};

export default LoadingBanChay;
