import React from "react";
import itemMenu from "../../../images/test.jpg";
import "./LoadingTableMenu.scss";
import { cutString } from "../../../utils/cutValue";
import Tooltip from "../../ToolTip/ToolTip";
import { useDispatch } from "react-redux";
import { setStatusMenuItem } from "../../../store/menuItem/setStatusMenuItem/actions";
import { valueFormMenu } from "../../../store/valueForm/menu/actions";
import { setListOption } from "../../../store/menuItem/menuOption/action";
import { ConvertMoney } from "../../../utils/convertMoney";
import { StarRating } from "../../../utils/Rating";

const LoadingTableMenu = ({
  item,
  index,
  offset,
  setShow,
  setShowOption,
  onClick,
}) => {
  console.log("render LoadingTableMenu");
  const dispatch = useDispatch();

  const handleClickXoaMenuItem = (itemMenuItem) => {
    dispatch(setStatusMenuItem.setStatus(["delete", itemMenuItem]));
    setShow(true);
  };

  const handleClickSuaMenuITem = (itemMenuItem) => {
    dispatch(setStatusMenuItem.setStatus(["update", itemMenuItem]));
    setShow(true);
    dispatch(valueFormMenu.setName(itemMenuItem.name));
    dispatch(valueFormMenu.setEngName(itemMenuItem.engName));
    dispatch(valueFormMenu.setDescription(itemMenuItem.description));
    dispatch(valueFormMenu.setPrice(itemMenuItem.price));
    dispatch(valueFormMenu.setImage(itemMenuItem.image_url));
    dispatch(valueFormMenu.setCategoryId(itemMenuItem.category_id._id));
    dispatch(valueFormMenu.setOptions(itemMenuItem.options));
  };

  const handleClickView = (item) => {
    setShowOption(true);
    dispatch(setListOption(item.options));
  };
  return (
    <tr className="loadingTableMenu">
      <td>{offset + index + 1}</td>
      <td>{item.name}</td>
      <td className="item-text">
        <Tooltip text={item.engName}> {cutString(item?.engName)}</Tooltip>
      </td>
      <td>
        <Tooltip text={item.description}>{cutString(item.description)}</Tooltip>
      </td>
      <td>{ConvertMoney(item.price)}</td>
      <td className="img-table" onClick={onClick}>
        <img src={item.image_url || itemMenu} alt="avatar" loading="lazy" />
      </td>
      <td>
        <StarRating rating={item.rating} />
      </td>
      <td>{item.category}</td>
      <td>
        {item && item.options && item.options.length > 0 && (
          <button
            className="btn btn-secondary"
            onClick={() => handleClickView(item)}
          >
            Món Phụ
          </button>
        )}
        <button
          className="btn btn-danger mx-3"
          onClick={() => handleClickXoaMenuItem(item)}
        >
          Xóa
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleClickSuaMenuITem(item)}
        >
          Sửa
        </button>
      </td>
    </tr>
  );
};

export default React.memo(LoadingTableMenu);
