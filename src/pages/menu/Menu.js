import React, { useState } from "react";
import "./Menu.scss";
import TableMenu from "../../components/tables/tableMenu/TableMenu";
import { useDispatch, useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
import { setStatusMenuItem } from "../../store/menuItem/setStatusMenuItem/actions";
import ModalMenuItem from "../../components/Modal/menu/ModalMenuItem";
import { valueFormMenu } from "../../store/valueForm/menu/actions";
import ModalOption from "../../components/tables/tableMenu/ModalOption";
function Menu(props) {
  console.log("render Menu");
  const [show, setShow] = useState(false);
  const [showOption, setShowOption] = useState(false);

  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const handleClickAddNewMenu = (e) => {
    e.preventDefault();
    dispatch(setStatusMenuItem.setStatus(["create"]));
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    dispatch(valueFormMenu.setName(""));
    dispatch(valueFormMenu.setEngName(""));
    dispatch(valueFormMenu.setDescription(""));
    dispatch(valueFormMenu.setPrice(""));
    dispatch(valueFormMenu.setImage(""));
    dispatch(valueFormMenu.setCategoryId(""));
    dispatch(valueFormMenu.setOptions([]));
  };
  return (
    <div className={`layout-menu ${theme ? "theme" : ""}`}>
      <ModalMenuItem show={show} handleClose={handleClose} setShow={setShow} />
      <ModalOption show={showOption} setShow={setShowOption} />
      <button
        className="mt-3 mx-3 btn btn-primary bt2"
        onClick={handleClickAddNewMenu}
      >
        Tạo Món Ăn
      </button>
      <TableMenu setShow={setShow} setShowOption={setShowOption} />
    </div>
  );
}

export default React.memo(Menu);
