import React from "react";
import { Avatar } from "antd";
import { FormatDay } from "../../utils/FormDay";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ConvertMoney } from "../../utils/convertMoney";

const FormUnConfirm = ({ item, handleClickConfirm, totalFinished }) => {
  return (
    <>
      <fieldset className="border rounded-3 p-3">
        <legend className="float-none w-auto px-3 legend">
          <span>{item.menuItemId.engName}</span>
          <button
            onClick={handleClickConfirm}
            className={
              item.status === "loading"
                ? "btn btn-primary mx-2"
                : "btn btn-secondary mx-2"
            }
          >
            {item.status === "loading" ? "Xác nhận" : "Đã xác nhận"}
          </button>
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
                <img src={item.menuItemId.image_url} alt="a" loading="lazy" />
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
                type="text"
                placeholder="name@example.com"
                disabled
                value={item.menuItemId.name || ""}
                readOnly
              />
            </FloatingLabel>
          </div>
        </div>
        <FloatingLabel
          controlId="floatingInput"
          label="Giá món"
          className="mb-3 mt-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            disabled
            value={ConvertMoney(item.menuItemId.price) || 0}
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Số lượng"
          className="mb-3 mt-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            disabled
            value={item.quantity || 0}
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Ngày đặt"
          className="mb-3 mt-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            disabled
            value={FormatDay(item.createdAt) || ""}
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Tổng lượt đặt"
          className="mb-3 mt-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            disabled
            value={item.orderCount || 0}
            readOnly
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Trạng thái món"
          className="mb-3 mt-3"
        >
          <Form.Control
            type="text"
            placeholder="name@example.com"
            disabled
            value={item.status === "loading" ? "đang làm" : "đã xong" || ""}
            readOnly
          />
        </FloatingLabel>
      </fieldset>
    </>
  );
};

export default FormUnConfirm;
