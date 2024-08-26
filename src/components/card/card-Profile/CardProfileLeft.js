import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { FacebookFilled, InstagramFilled } from "@ant-design/icons";
import "./CardProfileLeft.scss";
import { useSelector } from "react-redux";
import { getMeState, getThemeState } from "../../../store/selector";
import Lightbox from "react-awesome-lightbox";

const CardProfileLeft = () => {
  console.log("render CardProfileLeft");
  const theme = useSelector(getThemeState);
  const getMe = useSelector(getMeState);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");

  const handleClickImage = () => {
    setIsOpen(true);
    setCurrentImage(getMe?.isDataMe?.img_avatar_url);
    setTitle(getMe?.isDataMe?.fullName);
  };
  console.log(currentImage, title);
  return (
    <>
      {currentImage && isOpen && (
        <Lightbox
          image={currentImage}
          title={title}
          onClose={() => {
            setIsOpen(false);
            setCurrentImage("");
            setTitle("");
          }}
        />
      )}
      <Card
        bordered={false}
        className={`card-profile-1 ${theme ? "theme" : ""}`}
      >
        <Avatar
          style={{ cursor: "pointer" }}
          onClick={handleClickImage}
          size={120}
          src={
            <img
              src={getMe?.isDataMe?.img_avatar_url}
              alt="avatar"
              className="avatar"
              loading="lazy"
            />
          }
        />
        <p className="p">{getMe?.isDataMe?.fullName || "Phùng Hưng"}</p>
        <div className="box-icon mt-3">
          <FacebookFilled className="ic-footer" />
          <InstagramFilled className="ic-footer" />
        </div>
      </Card>
    </>
  );
};

export default CardProfileLeft;
