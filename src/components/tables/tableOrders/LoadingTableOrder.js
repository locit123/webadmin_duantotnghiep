import React from "react";
import { FormatDay2, FormatTimeNow } from "../../../utils/FormDay";
import { ConvertMoney } from "../../../utils/convertMoney";

const LoadingTableOrder = ({
  item,
  index,
  onClick,
  offset,
  handleClickView,
}) => {
  return (
    <>
      <tr key={index}>
        <td>{offset + index + 1}</td>
        <td>{item.tableNumber}</td>
        <td>{ConvertMoney(item.amount)}</td>
        <td>{item.userPay.fullName}</td>
        <td>{item.paymentMethod}</td>
        <td
          className="img_avatar"
          onClick={onClick}
          style={{ cursor: "pointer" }}
        >
          <img
            alt="img_avatar"
            src={item.userPay.img_avatar_url}
            loading="lazy"
          />
        </td>
        <td>
          {FormatDay2(item.createdAt)} ~ {FormatTimeNow(item.createdAt)}
        </td>
        <td className="bt">
          <button
            className="btn btn-secondary"
            onClick={() => handleClickView(item)}
          >
            Món đặt
          </button>
        </td>
      </tr>
    </>
  );
};

export default LoadingTableOrder;
