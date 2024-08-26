import { BsEmojiHeartEyesFill } from "react-icons/bs";
import { Tag } from "antd";
import React, { useState } from "react";

const LoadingCardBan = ({ data, handleClickTag, handleClickImageQR }) => {
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
  };

  const handleMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div
      className="box-item-ban"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item-ban">
        <div className="b-ic">
          <span className="so-ban">Bàn {data.tableNumber}</span>
          <BsEmojiHeartEyesFill className="icon-smile" />
        </div>
      </div>
      <div className="item-status" style={{ cursor: "pointer" }}>
        <img
          src={data.qrCode}
          alt="qr"
          loading="lazy"
          onClick={handleClickImageQR}
        />
      </div>

      {isActive && (
        <Tag color="#E8900C" className="check" onClick={handleClickTag}>
          Kiểm tra
        </Tag>
      )}
    </div>
  );
};

export default LoadingCardBan;
