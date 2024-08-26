import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../Modal/Tables/ModalDeleteTable";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteCategoryState } from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import { deleteCategory } from "../../../api/call_api/categories/fetchApiCategory";
import { Tag } from "antd";
const ModalDeleteCategories = ({ show, handleClose, dataItem, setShow }) => {
  const getStateDelete = useSelector(getDeleteCategoryState);
  console.log(getStateDelete, "<<<<<<<<getStateDelete");
  const dispatch = useDispatch();
  const handleClickDelete = async () => {
    await deleteCategory(dispatch, dataItem._id, setShow);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>Xóa Thể Loại</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {
            <>
              <span>Bạn có chắc chắn là muốn xóa category </span>
              <Tag color="red" style={{ fontSize: ".9rem" }}>
                {dataItem?.name}
              </Tag>
              <span>này không ?</span>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Không
          </Button>
          <Button variant="primary" onClick={handleClickDelete}>
            {getStateDelete?.isLoadingDeleteCategory ? (
              <LoadingOutlined />
            ) : (
              "Xác Nhận"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteCategories;
