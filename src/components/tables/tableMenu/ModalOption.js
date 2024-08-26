import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { menuOptionState } from "../../../store/selector";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import { Avatar } from "antd";

function ModalOption({ show, setShow }) {
  const handleClose = () => setShow(false);
  const itemOption = useSelector(menuOptionState);

  return (
    <Modal show={show} onHide={handleClose} backdrop={"static"}>
      <Modal.Header closeButton>
        <Modal.Title>Món phụ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {itemOption &&
          itemOption.length > 0 &&
          itemOption.map((item, index) => {
            return (
              <fieldset key={index} className="border rounded-3 p-3">
                <legend
                  className="float-none w-auto px-3"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                  }}
                >
                  {item.name}:
                </legend>
                <div className="row">
                  <div className="col-4">
                    <Avatar
                      size={{
                        xs: 24,
                        sm: 32,
                        md: 40,
                        lg: 64,
                        xl: 80,
                        xxl: 100,
                      }}
                      icon={
                        <img
                          src={item.image_url}
                          alt="img_user"
                          loading="lazy"
                        />
                      }
                    />
                  </div>
                  <div className="col-8">
                    <div className="">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="tên món"
                        className="mb-3"
                      >
                        <Form.Control
                          value={item.name}
                          type="text"
                          placeholder="name@example.com"
                          disabled
                          readOnly
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                </div>
              </fieldset>
            );
          })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Thoát
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalOption;
