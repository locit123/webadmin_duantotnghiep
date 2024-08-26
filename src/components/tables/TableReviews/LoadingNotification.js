import React from "react";
import ToolTip from "../../ToolTip/ToolTip";
import { cutString } from "../../../utils/cutValue";
import { FormatDay2, FormatTimeNow } from "../../../utils/FormDay";
import { useDispatch } from "react-redux";
import { typeActionNotificationValues } from "../../../store/notifications/actionsNotification";

const LoadingNotification = ({
  item,
  index,
  setStatusNotification,
  setShow,
  offset,
}) => {
  const dispatch = useDispatch();
  const handleClickXoa = () => {
    setShow(true);
    setStatusNotification(["delete", item]);
  };

  const handleChangeMore = () => {
    setShow(true);
    setStatusNotification(["view", item]);
  };

  const handleClickUpdate = () => {
    setShow(true);
    setStatusNotification(["update", item.image_url, item._id]);
    dispatch(typeActionNotificationValues.setTitle(item.title));
    dispatch(typeActionNotificationValues.setContent(item.content));
    dispatch(typeActionNotificationValues.setSummary(item.summary));
  };
  return (
    <tr>
      <td>{offset + index + 1}</td>
      <td>{item.title}</td>
      <td>
        <ToolTip text={item.content}>{cutString(item.content)}</ToolTip>
      </td>
      <td>
        <ToolTip text={item.summary}>{cutString(item.summary)}</ToolTip>
      </td>
      <td>
        {FormatDay2(item.createdAt)} ~ {FormatTimeNow(item.createdAt)}
      </td>

      <td>
        <button className="btn btn-secondary" onClick={handleChangeMore}>
          Chi tiết
        </button>
        <button className="btn btn-primary mx-2" onClick={handleClickUpdate}>
          Sửa
        </button>
        <button className="btn btn-danger" onClick={handleClickXoa}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default LoadingNotification;
