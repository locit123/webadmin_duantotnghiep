import Button from "react-bootstrap/Button";
import React, { useCallback } from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalDeleteTable.scss";
import { useDispatch, useSelector } from "react-redux";
import { getDeleteTableState } from "../../../store/selector";
import { destroyTable } from "../../../api/call_api/tables/fetchApiTable";
import { LoadingOutlined } from "@ant-design/icons";
import { Tag } from "antd";
const ModalDeleteTable = ({ show, handleClose, itemTable, setShow }) => {
  console.log(itemTable);
  const getStateDelete = useSelector(getDeleteTableState);
  const dispatch = useDispatch();

  const handleClickDelete = useCallback(async () => {
    await destroyTable(dispatch, itemTable._id, setShow);
  }, [dispatch, itemTable._id, setShow]);

  return (
    <>
      <Modal show={show} onHide={handleClose} className="modal-delete">
        <Modal.Header closeButton>
          <Modal.Title>Xóa Bàn</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {
            <>
              <span>Bạn có chắc chắn là muốn xóa bàn số </span>
              <Tag color="red" style={{ fontSize: ".9rem" }}>
                {itemTable.tableNumber}
              </Tag>
              <span>này không ?</span>
            </>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleClickDelete}>
            {getStateDelete?.isLoading ? <LoadingOutlined /> : "Xác nhận"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(ModalDeleteTable);
