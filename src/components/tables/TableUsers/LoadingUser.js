import React from "react";
import avatar from "../../../images/messages-1.jpg";
import moment from "moment";
import "./LoadingUser.scss";
import { SmileFilled, MehFilled } from "@ant-design/icons";

const LoadingUser = ({ item, handleClickXoa }) => {
  console.log("render LoadingUser");
  const originalTime = item.updatedAt;
  const status = item?.status;
  const formattedTime = moment(originalTime).format("DD-MM-YYYY ~ HH:mm:ss");
  console.log(item, "<<<<<<<<<<<<<<<<<<<<<<<<<<<");
  return (
    <>
      <tr>
        <td>{item?.id}</td>
        <td>123456</td>
        <td>{item?.userName}</td>
        <td className="avatar">
          <img loading="lazy" src={item?.avatar || avatar} alt="avatar" />
        </td>
        <td>{item?.role}</td>
        <td className="td-status">
          <div
            className={status === "online" ? "status-online" : "status-offline"}
            style={{ fontSize: "1rem" }}
          >
            {status}
          </div>
          {status === "online" ? (
            <SmileFilled className="status-online" />
          ) : (
            <MehFilled className="status-offline" />
          )}
        </td>
        <td>{formattedTime}</td>
        <td className="bt">
          <button
            className="btn btn-danger"
            onClick={handleClickXoa}
            disabled={item?.role === "admin" ? true : false}
          >
            Xóa
          </button>
          <button className="btn btn-primary">Sửa</button>
        </td>
      </tr>
    </>
  );
};

export default LoadingUser;
