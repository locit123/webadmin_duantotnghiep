import React, { useEffect, useState, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import "./FormModalNotification.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  contentState,
  summaryState,
  titleState,
} from "../../../../store/selector";
import { typeActionNotificationValues } from "../../../../store/notifications/actionsNotification";
import ConvertToBase from "../../../../utils/convertBase64";
import { RiDeleteBack2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import { AiOutlineCloudSync } from "react-icons/ai";
const FormModalNotification = ({
  status,
  data,
  deleteImages,
  setDeleteImages,
  image,
  setImage,
}) => {
  const title = useSelector(titleState);
  const content = useSelector(contentState);
  const summary = useSelector(summaryState);
  const dispatch = useDispatch();
  const [dataListImage, setDataListImage] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [fileListUpdate, setFileListUpdate] = useState([]);
  const fileInputRef = useRef(null);
  console.log(status, "check status");

  /***********************************CHANGE IMAGE************************** */
  const handleChangeImages = async (e) => {
    let files = Array.from(e.target.files);
    if (status === "create") {
      let dataImage = [...dataListImage];
      let newFiles = [...fileList];
      for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file) {
          let base64 = await ConvertToBase.getBase64(file);
          if (!dataListImage.includes(base64)) {
            dataImage.push(base64);
            newFiles.push(file);
          } else {
            toast.warning(`Ảnh ${file.name} này đã tồn tại`);
          }
        }
      }
      setDataListImage(dataImage);
      setFileList(newFiles);
      dispatch(typeActionNotificationValues.setImage(newFiles));
    } else if (status === "update") {
      let newImages = [...image];
      let newFiles = [...fileListUpdate];
      for (const file of files) {
        if (file) {
          const base64 = await ConvertToBase.getBase64(file);
          if (!newImages.includes(base64)) {
            newImages.push(base64);
            newFiles.push(file);
          } else {
            toast.warning(`Ảnh ${file.name} này đã tồn tại`);
          }
        }
      }
      setImage(newImages);
      setFileListUpdate(newFiles);
      dispatch(typeActionNotificationValues.setImage(newFiles));
    }
  };
  useEffect(() => {
    if (fileList && fileList.length > 0) {
      let dataTransfer = new DataTransfer();
      fileList.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
      dispatch(typeActionNotificationValues.setImage(fileList));
    }
  }, [fileList, dispatch]);
  /***********************************DISPATCH UPDATE IMAGE**************************8 */
  useEffect(() => {
    if (data && data.length > 0 && status === "update") {
      setDataListImage(data);
    }
  }, [data, status]);

  /***********************************DELETE IMAGE**************************8 */

  const handleClickDeleteImage = (item) => {
    if (dataListImage && dataListImage.length > 0) {
      setDeleteImages([...deleteImages, item]);
    }
    // Cập nhật danh sách ảnh
    let newFilterImages = dataListImage.filter((image) => {
      return image !== item;
    });
    setDataListImage(newFilterImages);

    // Cập nhật lại danh sách tệp tin
    let newFilterFiles = fileList.filter((file, index) => {
      let base64 = dataListImage[index];
      return base64 !== item; //cập nhật file khi ảnh xóa
    });
    setFileList(newFilterFiles);

    // Tạo một DataTransfer object mới để cập nhật lại input file
    const dataTransfer = new DataTransfer();
    newFilterFiles.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
    dispatch(typeActionNotificationValues.setImage(newFilterFiles));
  };

  const handleChangePhucHoi = (item) => {
    setDataListImage([...dataListImage, item]);
    let filterPhucHoi = deleteImages.filter((img) => img !== item);
    setDeleteImages(filterPhucHoi);
  };

  useEffect(() => {
    if (fileListUpdate && fileListUpdate.length > 0) {
      const dataTransfer = new DataTransfer();
      fileListUpdate.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
      dispatch(typeActionNotificationValues.setImage(fileListUpdate));
    }
  }, [fileListUpdate, dispatch]);

  const handleXoaThemMoi = (item) => {
    let filterImage = image.filter((img) => img !== item);
    setImage(filterImage);

    let filterFile = fileListUpdate.filter((file, index) => {
      let base64 = image[index];
      return base64 !== item;
    });
    setFileListUpdate(filterFile);

    const dataTransfer = new DataTransfer();
    filterFile.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;

    dispatch(typeActionNotificationValues.setImage(filterFile));
  };
  return (
    <div>
      <FloatingLabel controlId="floatingInput" label="Tiêu đề" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={title}
          onChange={(e) =>
            dispatch(typeActionNotificationValues.setTitle(e.target.value))
          }
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Nội dung"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Password"
          value={content}
          onChange={(e) =>
            dispatch(typeActionNotificationValues.setContent(e.target.value))
          }
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPassword"
        label="Tóm tắt nội dung"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Password"
          value={summary}
          onChange={(e) =>
            dispatch(typeActionNotificationValues.setSummary(e.target.value))
          }
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Hình ảnh">
        <Form.Control
          type="file"
          placeholder="Password"
          multiple
          accept="image/*"
          onChange={handleChangeImages}
          ref={fileInputRef} // Gắn ref cho input file
        />
      </FloatingLabel>
      {dataListImage && dataListImage.length > 0 && (
        <>
          <span className="mt-4 mb-4">Ảnh hiện có</span>
          <div className="preview">
            {dataListImage?.map((item, i) => {
              return (
                <div className="preview-ic" key={i}>
                  <img src={item} alt="anh" loading="lazy" />
                  <RiDeleteBack2Line
                    title="xóa ảnh"
                    className="ic-delete"
                    color="red"
                    onClick={() => handleClickDeleteImage(item)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      {status === "update" && deleteImages && deleteImages.length > 0 && (
        <>
          <span className="mt-4 mb-4">Ảnh muốn xóa</span>
          <div className="preview">
            {deleteImages?.map((item, i) => {
              return (
                <div className="preview-ic" key={i}>
                  <img src={item} alt="anh" loading="lazy" />
                  <AiOutlineCloudSync
                    className="ic-delete"
                    color="blue"
                    title="phục hồi"
                    onClick={() => handleChangePhucHoi(item)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
      {status === "update" && image && image.length > 0 && (
        <>
          <span className="mt-4 mb-4">Ảnh thêm mới</span>
          <div className="preview">
            {image?.map((item, i) => {
              return (
                <div className="preview-ic" key={i}>
                  <img src={item} alt="anh" loading="lazy" />
                  <RiDeleteBack2Line
                    className="ic-delete"
                    color="red"
                    title="phục hồi"
                    onClick={() => handleXoaThemMoi(item)}
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default FormModalNotification;
