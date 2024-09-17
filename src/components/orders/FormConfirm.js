import React from "react";
import { Avatar, Tag } from "antd";
import { FormatDay } from "../../utils/FormDay";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import { ConvertMoney } from "../../utils/convertMoney";
import Form from "react-bootstrap/Form";

const dataOption = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const FormConfirm = ({ item, handleClickConfirm, value, onChange }) => {
  return (
    <>
      <fieldset className="border rounded-3 p-3">
        <legend className="float-none w-auto px-3 legend">
          <span>{item.menuItemId.engName}</span>
          {item.quantity === 1 ? (
            <Tag color="cyan" style={{ marginLeft: "5px" }}>
              Số lượng: {item.quantity}
            </Tag>
          ) : (
            <select
              style={{ marginLeft: "5px" }}
              value={value}
              onChange={onChange}
            >
              {dataOption.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          )}

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

export default FormConfirm;
