import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FormModalNotification from "./FormModalNotification";
import { useDispatch, useSelector } from "react-redux";
import { typeActionNotificationValues } from "../../../../store/notifications/actionsNotification";
import {
  deleteEvent,
  postEvent,
  updateEvent,
} from "../../../../api/call_api/notifications/fetchApiNotifications";
import {
  contentState,
  imagesState,
  summaryState,
  titleState,
} from "../../../../store/selector";
import { Tag } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import FormViewNotification from "./FormViewNotification";

const ModalNotification = ({
  show,
  setShow,
  statusNotification,
  setListDataEvent,
  setIsLoading,
  isLoading,
}) => {
  const [deleteImages, setDeleteImages] = useState([]);
  const [image, setImage] = useState([]);
  const dispatch = useDispatch();
  const title = useSelector(titleState);
  const content = useSelector(contentState);
  const summary = useSelector(summaryState);
  const images = useSelector(imagesState);

  const handleClose = () => {
    setShow(false);
    dispatch(typeActionNotificationValues.setTitle(""));
    dispatch(typeActionNotificationValues.setContent(""));
    dispatch(typeActionNotificationValues.setImage([]));
    dispatch(typeActionNotificationValues.setSummary(""));
    setImage([]);
    setDeleteImages([]);
  };
  const handleSubmitForm = async () => {
    if (statusNotification[0] === "create") {
      await postEvent(
        title,
        summary,
        content,
        images,
        handleClose,
        setListDataEvent,
        setIsLoading
      );
    }
    if (statusNotification[0] === "delete") {
      await deleteEvent(
        statusNotification[1]._id,
        handleClose,
        setListDataEvent,
        setIsLoading
      );
    }
    if (statusNotification[0] === "update") {
      await updateEvent(
        statusNotification[2],
        title,
        content,
        summary,
        deleteImages,
        images,
        handleClose,
        setListDataEvent,
        setIsLoading
      );
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {statusNotification[0] === "create"
              ? "Thêm mới thông báo"
              : statusNotification[0] === "delete"
              ? "Xoá thông báo"
              : statusNotification[0] === "view"
              ? "Chi tiết thông báo"
              : "Sửa thông báo"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusNotification[0] === "create" ? (
            <FormModalNotification status={statusNotification[0]} />
          ) : statusNotification[0] === "delete" ? (
            <div>
              <span>Bạn có chắc chắn là muốn xóa thông báo </span>
              <Tag color="red">{statusNotification[1].title}</Tag>
              <span>này không?</span>
            </div>
          ) : statusNotification[0] === "view" ? (
            <FormViewNotification data={statusNotification[1]} />
          ) : (
            <FormModalNotification
              status={statusNotification[0]}
              data={statusNotification[1]}
              deleteImages={deleteImages}
              setDeleteImages={setDeleteImages}
              image={image}
              setImage={setImage}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          {statusNotification[0] !== "view" && (
            <Button
              variant={
                statusNotification[0] === "create"
                  ? "primary"
                  : statusNotification[0] === "delete"
                  ? "danger"
                  : "warning"
              }
              onClick={handleSubmitForm}
            >
              {isLoading ? (
                <LoadingOutlined />
              ) : statusNotification[0] === "create" ? (
                "Tạo"
              ) : statusNotification[0] === "delete" ? (
                "Xóa"
              ) : statusNotification[0] === "update" ? (
                "Cập nhật"
              ) : (
                ""
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalNotification;
