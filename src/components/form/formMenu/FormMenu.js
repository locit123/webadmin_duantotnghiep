import React, { useState } from "react";
import { SlideshowLightbox } from "lightbox.js-react";
import ConvertToBase from "../../../utils/convertBase64";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuItemState,
  getCategoriesState,
  getValueCategoryIdState,
  getValueDescriptionState,
  getValueEngNameState,
  getValueImageState,
  getValueNameState,
  getValueOptionsState,
  getValuePriceState,
} from "../../../store/selector";
import { valueFormMenu } from "../../../store/valueForm/menu/actions";
import { Tag } from "antd";
import { FloatingLabel, Form } from "react-bootstrap";

const FormMenu = () => {
  console.log("render FormMenu");
  const [isBase64, setIsBase64] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const name = useSelector(getValueNameState);
  const engName = useSelector(getValueEngNameState);
  const description = useSelector(getValueDescriptionState);
  const price = useSelector(getValuePriceState);
  const option = useSelector(getValueOptionsState);
  const getDataMenu = useSelector(getAllMenuItemState);
  const category_id = useSelector(getValueCategoryIdState);
  const image = useSelector(getValueImageState);
  const { dataMenuItem } = getDataMenu;
  const data = dataMenuItem?.data;
  const dispatch = useDispatch();
  const categoriesState = useSelector(getCategoriesState);
  const { dataGetCategories } = categoriesState;

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(valueFormMenu.setImage(file));
      const base64 = await ConvertToBase.getBase64(file);
      setIsBase64(base64);
    } else {
      setIsBase64(null);
    }
  };
  const handleChangOptions = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => ({
      _id: option.value,
      name: option.title,
    }));
    selectedOptions.forEach((selectedOption) => {
      if (!option.some((opt) => opt._id === selectedOption._id)) {
        dispatch(valueFormMenu.setOptions([...option, selectedOption]));
      }
    });
  };
  const handleClickRemoveOption = (o) => {
    dispatch(
      valueFormMenu.setOptions(option.filter((item) => item._id !== o._id))
    );
  };

  console.log(image, "image", isBase64, "isBase64<<<<<<<<<<<<<<<<");
  return (
    <div className="form">
      <FloatingLabel controlId="floatingInput" label="Tên món" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={name}
          onChange={(e) => dispatch(valueFormMenu.setName(e.target.value))}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Tên tiếng anh"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={(e) => dispatch(valueFormMenu.setEngName(e.target.value))}
          value={engName}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Mô tả" className="mb-3">
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={(e) =>
            dispatch(valueFormMenu.setDescription(e.target.value))
          }
          value={description}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Giá tiền"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          onChange={(e) => dispatch(valueFormMenu.setPrice(e.target.value))}
          value={price}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Ảnh món" className="mb-3">
        <Form.Control
          type="file"
          placeholder="name@example.com"
          onChange={handleChangeImage}
        />
      </FloatingLabel>
      {image && (
        <div className="img_menu">
          <img
            alt="hinh anh"
            loading="lazy"
            src={isBase64 ? isBase64 : image}
            onClick={() => {
              setIsOpen(true);
            }}
          />
          {isBase64 && (
            <SlideshowLightbox
              images={[{ src: isBase64 }]}
              showThumbnails={true}
              open={isOpen}
              lightboxIdentifier="lbox1"
              onClose={() => {
                setIsOpen(false);
              }}
            ></SlideshowLightbox>
          )}
        </div>
      )}
      <FloatingLabel controlId="floatingSelect" label="Thể loại">
        <Form.Select
          aria-label="Floating label select example"
          value={category_id}
          onChange={(e) =>
            dispatch(valueFormMenu.setCategoryId(e.target.value))
          }
        >
          <option value="" disabled>
            Chọn
          </option>
          {dataGetCategories?.data?.length > 0 &&
            dataGetCategories?.data?.map((item, index) => (
              <option key={index} value={item._id}>
                {item.name}
              </option>
            ))}
        </Form.Select>
      </FloatingLabel>
      <div className="mt-3">
        {option?.length > 0 && (
          <div className="opt">
            {option?.map((item, index) => (
              <Tag key={index} color="purple" className="tag">
                {item.name}
                <span
                  style={{ fontSize: "1.2rem", cursor: "pointer" }}
                  onClick={() => handleClickRemoveOption(item)}
                >
                  {` x`}
                </span>
              </Tag>
            ))}
          </div>
        )}
      </div>
      <FloatingLabel
        className="mt-3"
        controlId="floatingSelect"
        label="Món phụ"
      >
        <Form.Select
          aria-label="Floating label select example"
          value={option.map((opt) => opt.value)}
          onChange={handleChangOptions}
          multiple
          style={{ height: "100px" }}
        >
          {data?.length > 0 &&
            data?.map((item, index) => {
              return (
                <option key={index} title={item.name} value={item._id}>
                  {item.name}
                </option>
              );
            })}
        </Form.Select>
      </FloatingLabel>
    </div>
  );
};

export default FormMenu;
