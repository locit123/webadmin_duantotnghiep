import { Tag } from "antd";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { updateVersion } from "../../../api/call_api/promotions/fetchApiPromotions";
import { useState } from "react";

function ModalUpdateVersion({
  show,
  setShow,
  data,
  setListDataPromotion,
  setIsLoadingPromotion,
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClickSave = async () => {
    await updateVersion(
      data[0],
      setIsLoading,
      setListDataPromotion,
      setIsLoadingPromotion,
      setShow
    );
  };

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật phiên bản</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn là muốn cập nhật mã này{" "}
          <Tag color="blue"> {data[1]}</Tag>
          không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Trở lại
          </Button>
          <Button
            variant="primary"
            onClick={handleClickSave}
            disabled={isLoading ? true : false}
          >
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateVersion;
