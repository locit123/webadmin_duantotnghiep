import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./FormViewNotification.scss";
import { FormatDay2, FormatTimeNow } from "../../../../utils/FormDay";
const FormViewNotification = ({ data }) => {
  console.log(data, "check data view");

  return (
    <div>
      <FloatingLabel controlId="floatingInput" label="Tiêu đề" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={data.title || ""}
          readOnly
          disabled
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Nội dung"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={data.content || ""}
          readOnly
          disabled
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Tóm tắt nội dung"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={data.summary || ""}
          readOnly
          disabled
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Ngày tạo"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={
            `${FormatDay2(data.createdAt)} ~ ${FormatTimeNow(
              data.createdAt
            )}` || ""
          }
          readOnly
          disabled
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Ngày cập nhật"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={
            `${FormatDay2(data.updatedAt)} ~ ${FormatTimeNow(
              data.updatedAt
            )}` || ""
          }
          readOnly
          disabled
        />
      </FloatingLabel>
      <span>Hình ảnh:</span>
      <div className="box-images">
        {data.image_url && data.image_url.length > 0 ? (
          data.image_url.map((item, index) => {
            return <img key={index} src={item} alt="anh" loading="lazy" />;
          })
        ) : (
          <span>Không có ảnh</span>
        )}
      </div>
    </div>
  );
};

export default FormViewNotification;
