import { Avatar } from "antd";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ConvertMoney } from "../../../../utils/convertMoney";
import { useCallback, useEffect, useState } from "react";

function ModalOrder({
  show,
  setShow,
  listDataItem,
  setListDataItem,
  voucher,
  setVoucher,
}) {
  const [listNewDataItem, setListNewDataItem] = useState([]);

  const findElement = useCallback(() => {
    if (listDataItem && listDataItem.length > 0) {
      let result = listDataItem.reduce((arr, curr) => {
        const { menuItemId, quantity, amount, name } = curr;
        let findData = arr.find(
          (item) => item.menuItemId === menuItemId && item.name === name
        );
        if (findData) {
          findData.quantity += quantity;
          findData.amount += amount;
        } else {
          arr.push({ ...curr });
        }

        return arr;
      }, []);

      if (result && result.length > 0) {
        setListNewDataItem(result);
      } else {
        setListNewDataItem([]);
      }
    }
  }, [listDataItem]);
  useEffect(() => {
    findElement();
  }, [findElement]);
  const handleClose = () => {
    setShow(false);
    setListNewDataItem([]);
    setListDataItem([]);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>Món đã đặt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {listNewDataItem && listNewDataItem.length > 0 ? (
            listNewDataItem.map((item, index) => {
              return (
                <fieldset key={index} className="border rounded-3 p-3">
                  <legend
                    className="float-none w-auto px-3"
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  >
                    {item.engName}:
                  </legend>
                  <div className="row">
                    <div className="col-2">
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
                    <div className="col-10">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Tên món"
                        className="mb-3"
                      >
                        <Form.Control
                          defaultValue={item.name}
                          type="text"
                          placeholder="name@example.com"
                          disabled
                          readOnly
                        />
                      </FloatingLabel>
                    </div>
                  </div>
                  <div className="mt-3 mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Số lượng"
                      className="mb-3"
                    >
                      <Form.Control
                        defaultValue={item.quantity}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                  <div className="mt-3 mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Giá"
                      className="mb-3"
                    >
                      <Form.Control
                        value={ConvertMoney(item.amount || 0)}
                        type="text"
                        placeholder="name@example.com"
                        disabled
                        readOnly
                      />
                    </FloatingLabel>
                  </div>
                </fieldset>
              );
            })
          ) : (
            <div>Không có dữ liệu</div>
          )}
          {voucher && voucher.length > 0 && (
            <>
              <div className="mt-3 mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Mã giảm giá"
                  className="mb-3"
                >
                  <Form.Control
                    value={voucher[0] || ""}
                    type="text"
                    placeholder="name@example.com"
                    disabled
                    readOnly
                  />
                </FloatingLabel>
              </div>
              <div className="mt-3 mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Số tiền đã giảm"
                  className="mb-3"
                >
                  <Form.Control
                    value={ConvertMoney(voucher[1] || 0)}
                    type="text"
                    placeholder="name@example.com"
                    disabled
                    readOnly
                  />
                </FloatingLabel>
              </div>
              <div className="mt-3 mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Tổng hóa đơn"
                  className="mb-3"
                >
                  <Form.Control
                    value={ConvertMoney(voucher[2] || 0)}
                    type="text"
                    placeholder="name@example.com"
                    disabled
                    readOnly
                  />
                </FloatingLabel>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalOrder;
