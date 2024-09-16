import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { ConvertMoney } from "../../../../utils/convertMoney";
import { Tag } from "antd";
const HistoryPromotionUsers = ({ data }) => {
  return (
    <div>
      <fieldset className="border rounded-3 p-3 mb-3 mt-3">
        <legend
          className="float-none w-auto px-3"
          style={{ fontSize: "1rem", fontWeight: "bold" }}
        >
          {data.code}
        </legend>
        <FloatingLabel
          controlId="floatingPassword"
          label="Tổng lượt sử dụng mã này"
        >
          <Form.Control
            readOnly
            disabled
            value={data.totalUsed}
            type="text"
            placeholder="Password"
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingPassword"
          label="Tổng tiền đã giảm"
          className="mt-2"
        >
          <Form.Control
            readOnly
            disabled
            value={ConvertMoney(data.totalDiscount)}
            type="text"
            placeholder="Password"
          />
        </FloatingLabel>
        {data &&
          data.payments.length > 0 &&
          data.payments.map((item, index) => {
            console.log(item, "item");
            return (
              <fieldset className="border rounded-3 p-3 mb-3 mt-3" key={index}>
                <legend
                  className="float-none w-auto px-3"
                  style={{ fontSize: "1rem", fontWeight: "bold" }}
                >
                  <Tag color="#f50">Lần {index + 1}</Tag>
                </legend>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Tổng tiền"
                  className="mb-2"
                >
                  <Form.Control
                    readOnly
                    disabled
                    value={ConvertMoney(item.amount)}
                    type="text"
                    placeholder="Password"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Số tiền giảm"
                >
                  <Form.Control
                    readOnly
                    disabled
                    value={ConvertMoney(item.amountDiscount)}
                    type="text"
                    placeholder="Password"
                  />
                </FloatingLabel>
              </fieldset>
            );
          })}
      </fieldset>
    </div>
  );
};

export default HistoryPromotionUsers;
