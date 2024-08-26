import React, { useEffect, useState } from "react";
import "./EditProfile.scss";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getLightBoxState,
  getMeState,
  getThemeState,
  updateMeState,
  valueFormAvatarState,
  valueFormFullNameState,
} from "../../../../../store/selector";
import { SlideshowLightbox } from "lightbox.js-react";
import "lightbox.js-react/dist/index.css";
import {
  setHideLightBox,
  setShowLightBox,
} from "../../../../../store/lightBoxImage/actions";
import { valueFormUsers } from "../../../../../store/valueForm/users/actions";
import { putMe } from "../../../../../api/call_api/auth/fetchApiAuth";
import ConvertToBase from "../../../../../utils/convertBase64";

const EditProfile = () => {
  console.log("render editProfile");

  const [avatarFile, setAvatarFile] = useState(null);
  const [previousAvatar, setPreviousAvatar] = useState(null);
  const dispatch = useDispatch();
  const theme = useSelector(getThemeState);
  const lightBox = useSelector(getLightBoxState);
  const fullNameState = useSelector(valueFormFullNameState) || "";
  const avatarState = useSelector(valueFormAvatarState);
  const getMe = useSelector(getMeState);
  const updateState = useSelector(updateMeState);
  const { isLoadingUpdateMe } = updateState;

  useEffect(() => {
    const getStatus = () => {
      const currentAvatar = getMe?.isDataMe?.img_avatar_url;
      dispatch(
        valueFormUsers.setAvatarUpdateMe(getMe?.isDataMe?.img_avatar_url)
      );
      dispatch(valueFormUsers.setFullNameUpdateMe(getMe?.isDataMe?.fullName));
      setPreviousAvatar(currentAvatar);
      return;
    };
    getStatus();
  }, [dispatch, getMe?.isDataMe?.fullName, getMe?.isDataMe?.img_avatar_url]);

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const base64 = await ConvertToBase.getBase64(file);
      dispatch(valueFormUsers.setAvatarUpdateMe(base64));
    } else {
      console.log("file not found");
    }
  };

  const handleChangeFullName = (e) => {
    dispatch(valueFormUsers.setFullNameUpdateMe(e.target.value));
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append("fullName", fullNameState);
    formData.append("img_avatar_url", avatarFile);
    await putMe(dispatch, formData);
  };

  const handleClickDelete = () => {
    dispatch(valueFormUsers.setAvatarUpdateMe(previousAvatar));
    setAvatarFile(null);
  };
  return (
    <div className={`form-profile ${theme ? "theme" : ""}`}>
      <div className="form-group">
        <p>hình ảnh</p>
        <div className="box-img-edit">
          <div className="img">
            <img
              loading="lazy"
              src={avatarState}
              alt="avatar"
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(setShowLightBox())}
            />
            {avatarState && (
              <SlideshowLightbox
                images={[{ src: avatarState }]}
                showThumbnails={true}
                open={lightBox}
                lightboxIdentifier="lbox1"
                onClose={() => {
                  dispatch(setHideLightBox());
                }}
              />
            )}
          </div>
          <input type="file" id="file" hidden onChange={handleChangeImage} />
          <label htmlFor="file" className="mt-2">
            <UploadOutlined className="ic-upload" />
          </label>
          <DeleteOutlined className="ic-delete" onClick={handleClickDelete} />
        </div>
      </div>
      <div className="form-group mt-3 mb-3 form-2">
        <p>Họ và tên</p>
        <input
          className="form-control"
          placeholder="Nhập firstName..."
          type="text"
          onChange={handleChangeFullName}
          value={fullNameState}
        />
      </div>
      <div className="text-center mt-3 div">
        <button
          className="btn btn-primary bt2"
          onClick={handleClick}
          disabled={isLoadingUpdateMe ? true : false}
        >
          lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
