import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Modal/Tables/ModalDeleteTable";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import {
  getCreateMenuItemState,
  getDeleteMenuItemState,
  getStatusMenuItemState,
  getThemeState,
  getUpdateMenuItemState,
  getValueCategoryIdState,
  getValueDescriptionState,
  getValueEngNameState,
  getValueImageState,
  getValueNameState,
  getValueOptionsState,
  getValuePriceState,
} from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import FormMenu from "../../form/formMenu/FormMenu";
import "./ModalMenuItem.scss";
import {
  destroyMenuItem,
  patchMenuItem,
  postMenuItem,
} from "../../../api/call_api/menuItem/fetchApiMenuItem";
import { Tag } from "antd";

const ModalMenuItem = ({ show, handleClose, setShow }) => {
  const theme = useSelector(getThemeState);
  const getStatusMenuItem = useSelector(getStatusMenuItemState);
  const statusCreateItem = useSelector(getCreateMenuItemState);
  const { isLoadingCreateMenuItem } = statusCreateItem;
  const statusDeleteItem = useSelector(getDeleteMenuItemState);
  const { isLoadingDeleteMenuItem } = statusDeleteItem;
  const statusUpdateItem = useSelector(getUpdateMenuItemState);
  const { isLoadingUpdateMenuItem } = statusUpdateItem;
  const dataDelete = getStatusMenuItem[1];
  const name = useSelector(getValueNameState);
  const engName = useSelector(getValueEngNameState);
  const description = useSelector(getValueDescriptionState);
  const price = useSelector(getValuePriceState);
  const image = useSelector(getValueImageState);
  const category_id = useSelector(getValueCategoryIdState);
  const option = useSelector(getValueOptionsState);
  const dispatch = useDispatch();

  const handleClickCreateMenuItem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (getStatusMenuItem[0] === "create") {
      formData.append("name", name);
      formData.append("engName", engName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image_url", image);
      formData.append("category_id", category_id);
      const arrToStr = option?.map((element) => element._id);
      formData.append("options", JSON.stringify(arrToStr));

      await postMenuItem(dispatch, formData, setShow);
    }
    if (getStatusMenuItem[0] === "delete") {
      await destroyMenuItem(dispatch, dataDelete._id, setShow);
    }
    if (getStatusMenuItem[0] === "update") {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("engName", engName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image_url", image);
      formData.append("category_id", category_id);
      const arrToStr = option?.map((element) => element._id);
      formData.append("options", JSON.stringify(arrToStr));

      await patchMenuItem(dispatch, dataDelete._id, formData, setShow);
    }
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        className={`modal-delete ${theme ? "theme" : ""}`}
        backdrop={"static"}
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">
            {getStatusMenuItem[0] === "create"
              ? "Tạo món mới"
              : getStatusMenuItem[0] === "delete"
              ? "Xóa món"
              : getStatusMenuItem[0] === "update"
              ? "Cập nhật món"
              : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {getStatusMenuItem[0] === "create" ? (
            <FormMenu />
          ) : getStatusMenuItem[0] === "delete" ? (
            <>
              <span>Bạn có chắc chắn là muốn xóa món </span>
              <Tag color="red" style={{ fontSize: ".9rem" }}>
                {dataDelete?.name}
              </Tag>
              <span>này không?</span>
            </>
          ) : getStatusMenuItem[0] === "update" ? (
            <FormMenu />
          ) : (
            ""
          )}
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClickCreateMenuItem}>
            {isLoadingCreateMenuItem ? (
              <LoadingOutlined />
            ) : getStatusMenuItem[0] === "create" ? (
              "Tạo"
            ) : isLoadingDeleteMenuItem ? (
              <LoadingOutlined />
            ) : getStatusMenuItem[0] === "delete" ? (
              "Xác nhận"
            ) : isLoadingUpdateMenuItem ? (
              <LoadingOutlined />
            ) : getStatusMenuItem[0] === "update" ? (
              "Cập nhật"
            ) : (
              ""
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalMenuItem;
