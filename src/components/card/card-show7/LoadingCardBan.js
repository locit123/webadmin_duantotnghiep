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
    <div className="box-item-ban">
      <div
        className="item-ban"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="b-ic">
          <span className="so-ban">Bàn {data.tableNumber}</span>
          <BsEmojiHeartEyesFill className="icon-smile" />
        </div>
        {isActive && (
          <Tag color="#E8900C" className="check" onClick={handleClickTag}>
            Kiểm tra
          </Tag>
        )}
      </div>

      <div className="item-status" style={{ cursor: "pointer" }}>
        <img
          src={data.qrCode}
          alt="qr"
          loading="lazy"
          onClick={handleClickImageQR}
        />
      </div>
    </div>
  );
};

export default LoadingCardBan;
