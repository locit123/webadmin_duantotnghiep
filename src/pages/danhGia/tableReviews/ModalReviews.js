import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Avatar } from "antd";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
function ModalReviews({ show, setShow, menuItem }) {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Món đã đánh giá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-3">
              <Avatar
                size={{
                  xs: 24,
                  sm: 32,
                  md: 40,
                  lg: 64,
                  xl: 80,
                  xxl: 100,
                }}
                icon={<img loading="lazy" src={menuItem.image_url} alt="a" />}
              />
            </div>
            <div className="col-9">
              <FloatingLabel
                controlId="floatingInput"
                label="Tên món"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  readOnly
                  value={menuItem.name}
                  placeholder="name@example.com"
                />
              </FloatingLabel>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalReviews;
