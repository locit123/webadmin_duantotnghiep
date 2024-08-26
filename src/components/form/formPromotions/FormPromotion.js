import React, { useCallback, useEffect, useState } from "react";
import {
  postPromotion,
  updatePromotions,
} from "../../../api/call_api/promotions/fetchApiPromotions";
import FormatDate from "../../../utils/FormatDate";
import { LoadingOutlined } from "@ant-design/icons";
import { FloatingLabel, Form } from "react-bootstrap";
import _ from "lodash";
const FormPromotion = ({
  setListDataPromotion,
  statusPromotion,
  setDiscount,
  setDiscountType,
  setMinOrderValue,
  setMaxDiscount,
  setStartDate,
  setEndDate,
  discount,
  discountType,
  minOrderValue,
  maxDiscount,
  startDate,
  endDate,
  listDataPromotion,
  id,
  setMaxUsage,
  maxUsage,
  setStatusPromotion,
  setEventKey,
  setIsLoadingPromotion,
}) => {
  console.log("render FormPromotion");
  const [isLoading, setIsLoading] = useState(false);
  const newSetArray = [
    ...new Set(
      listDataPromotion?.data?.promotions?.map((item) => item.discountType) ||
        []
    ),
  ];

  const handleClickCreatePromotion = async () => {
    if (statusPromotion[0] === "create") {
      await postPromotion(
        parseInt(discount),
        discountType,
        parseInt(maxUsage),
        parseInt(minOrderValue),
        parseInt(maxDiscount),
        startDate,
        endDate,
        setListDataPromotion,
        setDiscountType,
        setIsLoading,
        setDiscount,
        setMaxUsage,
        setStartDate,
        setEndDate,
        setEventKey,
        setMinOrderValue,
        setMaxDiscount,
        setIsLoadingPromotion
      );
    }
    if (statusPromotion[0] === "update") {
      await updatePromotions(
        id,
        maxUsage,
        startDate,
        endDate,
        setListDataPromotion,
        setStatusPromotion,
        setDiscountType,
        setIsLoading,
        setIsLoadingPromotion
      );
    }
  };

  const dataFind = useCallback(() => {
    if (discountType !== "" && statusPromotion[0] !== "update") {
      let dataClone = _.cloneDeep(listDataPromotion?.data?.promotions);
      if (dataClone && dataClone.length > 0) {
        dataClone.reverse();
        let findItem = dataClone?.find(
          (item) => item.discountType === discountType
        );
        console.log(findItem, "check find");

        if (findItem) {
          setDiscount(findItem.discount);
          setMaxUsage(findItem.maxUsage);
          setStartDate(FormatDate(findItem.startDate));
          setEndDate(FormatDate(findItem.endDate));
          setMinOrderValue(findItem.minOrderValue);
          setMaxDiscount(findItem.maxDiscount);
        } else {
          setDiscount("");
          setMaxUsage("");
          setStartDate("");
          setEndDate("");
          setMinOrderValue("");
          setMaxDiscount("");
        }
      }
    }
  }, [
    discountType,
    listDataPromotion?.data?.promotions,
    setDiscount,
    setEndDate,
    setMaxUsage,
    setStartDate,
    setMaxDiscount,
    setMinOrderValue,
    statusPromotion,
  ]);

  useEffect(() => {
    dataFind();
  }, [dataFind]);
  return (
    <div className="form mb-3">
      <h1 className="text-h1 text-center mt-3 mb-3">
        {statusPromotion[0] === "update"
          ? "Cập nhật Khuyến Mãi"
          : "Tạo Khuyến Mãi"}
      </h1>
      <FloatingLabel
        controlId="floatingInput"
        label="Số tiền giảm"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder={
            discountType === "" || discountType !== "fixed"
              ? "Nhập % cần giảm"
              : "Nhập số tiền cần giảm"
          }
          onChange={(e) => setDiscount(e.target.value)}
          value={discount}
          disabled={statusPromotion[0] === "update" ? true : false}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Loại khuyến mãi">
        <Form.Select
          aria-label="Floating label select example"
          value={discountType}
          onChange={(e) => setDiscountType(e.target.value)}
          disabled={statusPromotion[0] === "update" ? true : false}
        >
          <option value={""} disabled>
            Chọn...
          </option>
          {newSetArray.length > 2 ? (
            newSetArray.map((item, index) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })
          ) : (
            <>
              <option value={"fixed"}>fixed</option>
              <option value={"percentage"}>percentage</option>
              <option value={"maxPercentage"}>maxPercentage</option>
            </>
          )}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="lượt sử dụng mã"
        className="mb-3 mt-3"
      >
        <Form.Control
          type="text"
          onChange={(e) => setMaxUsage(e.target.value)}
          value={maxUsage}
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Ngày bắt đầu"
        className="mb-3 mt-3"
      >
        <Form.Control
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
          placeholder="name@example.com"
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingInput"
        label="Ngày kết thúc"
        className="mb-3 mt-3"
      >
        <Form.Control
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
          placeholder="name@example.com"
        />
      </FloatingLabel>

      {discountType === "" || discountType !== "fixed" ? (
        <>
          {discountType === "percentage" ? (
            <FloatingLabel
              controlId="floatingInput"
              label="Số tiền tối thiểu"
              className="mb-3 mt-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => setMinOrderValue(e.target.value)}
                value={minOrderValue}
                disabled={statusPromotion[0] === "update" ? true : false}
                placeholder="name@example.com"
              />
            </FloatingLabel>
          ) : (
            <>
              <FloatingLabel
                controlId="floatingInput"
                label="Số tiền tối thiểu"
                className="mb-3 mt-3"
              >
                <Form.Control
                  type="text"
                  onChange={(e) => setMinOrderValue(e.target.value)}
                  value={minOrderValue}
                  disabled={statusPromotion[0] === "update" ? true : false}
                  placeholder="name@example.com"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Số tiền tối đa"
                className="mb-3 mt-3"
              >
                <Form.Control
                  type="text"
                  onChange={(e) => setMaxDiscount(e.target.value)}
                  value={maxDiscount}
                  disabled={statusPromotion[0] === "update" ? true : false}
                  placeholder="name@example.com"
                />
              </FloatingLabel>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      <div className="mt-3 text-center">
        <button
          className="btn btn-primary"
          onClick={handleClickCreatePromotion}
          disabled={isLoading ? true : false}
        >
          {isLoading ? (
            <LoadingOutlined spin />
          ) : statusPromotion[0] === "update" ? (
            "Cập Nhật"
          ) : (
            "Tạo"
          )}
        </button>
      </div>
    </div>
  );
};

export default React.memo(FormPromotion);
