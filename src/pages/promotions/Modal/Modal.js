import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deletePromotion } from "../../../api/call_api/promotions/fetchApiPromotions";
import FormatDate from "../../../utils/FormatDate";
import { useCallback, useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import { FormatDay } from "../../../utils/FormDay";
import { Tag } from "antd";
import { ConvertMoney } from "../../../utils/convertMoney";
function ModalPromotion({
  show,
  setShow,
  itemPromotion,
  statusPromotion,
  setDiscount,
  setDiscountType,
  setMinOrderValue,
  setMaxDiscount,
  setStartDate,
  setEndDate,
  setId,
  setMaxUsage,
  setListDataPromotion,
  setIsLoadingPromotion,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const getDataPromotion = useCallback(() => {
    if (statusPromotion[0] === "update") {
      setId(itemPromotion?.item?._id);
      setDiscount(itemPromotion?.item?.discount || "");
      setDiscountType(itemPromotion?.item?.discountType || "");
      setMinOrderValue(itemPromotion?.item?.minOrderValue || "");
      setMaxDiscount(itemPromotion?.item?.maxDiscount || "");
      setStartDate(FormatDate(itemPromotion?.item?.startDate) || "");
      setEndDate(FormatDate(itemPromotion?.item?.endDate) || "");
      setMaxUsage(itemPromotion?.item?.maxUsage || "");
    } else {
      setDiscount("");
      setDiscountType("");
      setMinOrderValue("");
      setMaxDiscount("");
      setStartDate("");
      setEndDate("");
      setId("");
      setMaxUsage("");
    }
  }, [
    statusPromotion,
    itemPromotion?.item,
    setDiscount,
    setDiscountType,
    setEndDate,
    setMaxDiscount,
    setMinOrderValue,
    setStartDate,
    setId,
    setMaxUsage,
  ]);

  useEffect(() => {
    getDataPromotion();
  }, [getDataPromotion]);

  const handleClose = () => {
    setShow(false);
  };

  const handleClickXoa = async () => {
    if (statusPromotion[0] === "delete") {
      await deletePromotion(
        itemPromotion.id,
        setListDataPromotion,
        handleClose,
        setIsLoading,
        setIsLoadingPromotion
      );
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop={"static"}>
        <Modal.Header closeButton>
          <Modal.Title>
            {statusPromotion[0] === "delete"
              ? "Xóa khuyến mãi"
              : "Chi tiết khuyến mãi"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {statusPromotion[0] === "delete" ? (
            <>
              <span>Bạn chắc chắn là muốn xóa mã giảm giá </span>
              <Tag color="red">{itemPromotion.code || ""}</Tag>
              <span>này không?</span>
            </>
          ) : (
            <fieldset className="border rounded-3 p-3">
              <legend
                className="float-none w-auto px-3"
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                {itemPromotion?.item?.code || ""}
              </legend>
              <div className="mt-3 mb-3">
                <FloatingLabel
                  controlId="floatingInput"
                  label="Mô tả"
                  className="mb-3"
                >
                  <Form.Control
                    defaultValue={itemPromotion?.item?.description || ""}
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
                  label="Số tiền giảm"
                  className="mb-3"
                >
                  <Form.Control
                    defaultValue={
                      ConvertMoney(itemPromotion?.item?.discount) || ""
                    }
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
                  label="Loại mã"
                  className="mb-3"
                >
                  <Form.Control
                    defaultValue={itemPromotion?.item?.discountType || ""}
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
                  label="Trạng thái"
                  className="mb-3"
                >
                  <Form.Control
                    value={
                      itemPromotion?.item?.isActive
                        ? "Khả dụng"
                        : "Không khả dụng"
                    }
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
                  label="Lượt sử dụng"
                  className="mb-3"
                >
                  <Form.Control
                    value={itemPromotion?.item?.maxUsage || ""}
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
                  label="Từ ngày"
                  className="mb-3"
                >
                  <Form.Control
                    value={FormatDay(itemPromotion?.item?.startDate) || ""}
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
                  label="Đến ngày"
                  className="mb-3"
                >
                  <Form.Control
                    value={FormatDay(itemPromotion?.item?.endDate) || ""}
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
                  label="Ngày tạo mã"
                  className="mb-3"
                >
                  <Form.Control
                    value={FormatDay(itemPromotion?.item?.createdAt) || ""}
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
                  label="Ngày cập nhật mã"
                  className="mb-3"
                >
                  <Form.Control
                    value={FormatDay(itemPromotion?.item?.updatedAt) || ""}
                    type="text"
                    placeholder="name@example.com"
                    disabled
                    readOnly
                  />
                </FloatingLabel>
              </div>
            </fieldset>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          {statusPromotion[0] === "delete" && (
            <Button variant="primary" onClick={handleClickXoa}>
              {isLoading ? (
                <Loading3QuartersOutlined spin />
              ) : (
                statusPromotion[0] === "delete" && "Xác nhận"
              )}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalPromotion;
