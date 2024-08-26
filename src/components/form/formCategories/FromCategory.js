import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { valueFormCategories } from "../../../store/valueForm/categories/actions";
import {
  getCategoriesState,
  getCreateCategoryState,
  getNameState,
  getStatusCategoryState,
  getUpdateCategoryState,
} from "../../../store/selector";
import {
  createCategory,
  updateCategory,
} from "../../../api/call_api/categories/fetchApiCategory";
import { LoadingOutlined } from "@ant-design/icons";
import { setStatusCategories } from "../../../store/categories/setStatus/actions";
import { FloatingLabel, Form } from "react-bootstrap";

const FromCategory = () => {
  console.log("render FormCategory");
  const name = useSelector(getNameState);
  const getCreateState = useSelector(getCreateCategoryState);
  const getStatusCategory = useSelector(getStatusCategoryState);
  const getUpdateState = useSelector(getUpdateCategoryState);
  //test
  const getDataState = useSelector(getCategoriesState);
  const { dataGetCategories } = getDataState;
  const data = dataGetCategories?.data;

  const dispatch = useDispatch();
  const handleChangName = (e) => {
    dispatch(valueFormCategories.setName(e.target.value));
  };

  const handleClickAddCategory = async () => {
    if (
      getStatusCategory[0] === "create" ||
      getStatusCategory[0] !== "update"
    ) {
      await createCategory(dispatch, name);
      const newData = data?.reverse();
      console.log(newData, "NEW -DATA");
      const newArr = { ...dataGetCategories, data: newData };
      console.log(newArr, "NEW ARRAY");
    } else {
      await updateCategory(dispatch, getStatusCategory[1], name);
    }
  };

  const handleClickClose = () => {
    dispatch(setStatusCategories.setStatus(["create"]));
    dispatch(valueFormCategories.setName(""));
  };
  return (
    <div className="form">
      <h1 className="text-h1 text-center mt-3 mb-3">
        {getStatusCategory[0] === "create"
          ? "Tạo Mới Thể Loại"
          : "Cập nhật thể loại"}
      </h1>
      <FloatingLabel
        controlId="floatingInput"
        label="Tên thể loại"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="name@example.com"
          value={name}
          onChange={handleChangName}
        />
      </FloatingLabel>
      <div className="mt-3 text-center two-bt">
        {getStatusCategory[0] === "update" ? (
          <>
            <button
              className="btn btn-primary bt2"
              onClick={handleClickAddCategory}
            >
              {getStatusCategory[0] === "create" ||
              getStatusCategory[0] !== "update" ? (
                getCreateState?.isLoadingCreateCategory ? (
                  <LoadingOutlined />
                ) : (
                  "Tạo"
                )
              ) : getUpdateState?.isLoadingUpdateCategory ? (
                <LoadingOutlined />
              ) : (
                "Cập Nhật"
              )}
            </button>
            <button className="btn btn-danger bt2" onClick={handleClickClose}>
              Hủy
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary bt2"
            onClick={handleClickAddCategory}
          >
            {getStatusCategory[0] === "create" ||
            getStatusCategory[0] !== "update" ? (
              getCreateState?.isLoadingCreateCategory ? (
                <LoadingOutlined />
              ) : (
                "Tạo"
              )
            ) : getUpdateState?.isLoadingUpdateCategory ? (
              <LoadingOutlined />
            ) : (
              "Cập Nhật"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FromCategory;
