import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import {
  FormatDay,
  FormatDay2,
  FormatTimeNow,
} from "../../../../utils/FormDay";
import { ConvertMoney } from "../../../../utils/convertMoney";
import { Avatar, Tag } from "antd";
const LoadingBanking = ({ item }) => {
  return (
    <div>
      <div className="mb-3 mt-3">
        <h1 style={{ fontSize: "1.2rem" }}>
          Thông tin món
          <Tag style={{ fontSize: "1.1rem" }} color="#f50">
            {`${FormatDay2(item.createdAt)} ~ ${FormatTimeNow(item.createdAt)}`}
          </Tag>
        </h1>
      </div>
      <div className="mt-3 mb-3">
        <FloatingLabel
          controlId="floatingInput"
          label="Số bàn"
          className="mb-3"
        >
          <Form.Control
            value={item.tableNumber || 0}
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
          label="Ngày đặt"
          className="mb-3"
        >
          <Form.Control
            value={FormatDay(item.createdAt) || ""}
            type="text"
            placeholder="name@example.com"
            disabled
            readOnly
          />
        </FloatingLabel>
        <div className="mt-3 mb-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Tổng Tiền"
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
      </div>
      {item?.items?.length > 0 &&
        item?.items?.map((item, index) => {
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
                    icon={
                      <img src={item.image_url} alt="img_user" loading="lazy" />
                    }
                  />
                </div>
                <div className="col-9">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Tên món"
                    className="mb-3"
                  >
                    <Form.Control
                      value={item.name || ""}
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
                    value={item.quantity || 0}
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
                    value={ConvertMoney(item.price || 0)}
                    type="text"
                    placeholder="name@example.com"
                    disabled
                    readOnly
                  />
                </FloatingLabel>
              </div>
            </fieldset>
          );
        })}
    </div>
  );
};

export default LoadingBanking;
