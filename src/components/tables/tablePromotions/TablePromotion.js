import Table from "react-bootstrap/Table";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  getPromotion,
  patchStatusPromotion,
  postResetAllPromotion,
} from "../../../api/call_api/promotions/fetchApiPromotions";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { BiToggleRight, BiToggleLeft } from "react-icons/bi";
import { BsToggle2On, BsToggle2Off } from "react-icons/bs";
import { LoadingOutlined } from "@ant-design/icons";
import { NO_POINT, POINT } from "../../../utils/contants";
import { Tag } from "antd";
import ModalUpdateVersion from "./ModalUpdateVersion";
const TablePromotion = ({
  listDataPromotion,
  setListDataPromotion,
  setShow,
  setItemPromotion,
  setStatusPromotion,
  setIsLoadingPromotion,
  isLoadingPromotion,
  isSelected,
  setIsSelected,
}) => {
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [selectPromotions, setSelectPromotions] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPoints, setIsPoints] = useState(POINT);
  const [checkPoint, setCheckPoint] = useState();
  const [showUpdateVersion, setShowUpdateVersion] = useState(false);
  const [dataUpdateVersion, setDataUpdateVersion] = useState([]);
  let data = listDataPromotion?.data?.promotions;

  /*********************************************************GET DATA********************************************* */
  const getApiPromotions = useCallback(async () => {
    await getPromotion(setListDataPromotion, setIsLoadingPromotion);
  }, [setListDataPromotion, setIsLoadingPromotion]);

  useEffect(() => {
    getApiPromotions();
  }, [getApiPromotions]);

  /*********************************************************GET DATA SELECTED********************************************* */
  const dataSuccess = useCallback(() => {
    if (data && data.length > 0) {
      let newData = [];
      let optionData = [];
      let isCheckPoints;
      for (let i = 0; i < data.length; i++) {
        if (isPoints === POINT && data[i].requiredPoints) {
          optionData.push(data[i]);
          isCheckPoints = !!data[i].requiredPoints;
          if (data[i].discountType === isSelected) {
            newData.push(data[i]);
          }
          if (data[i].isActive.toString() === isSelected) {
            newData.push(data[i]);
          }
        } else if (isPoints === NO_POINT && !data[i].requiredPoints) {
          optionData.push(data[i]);
          if (data[i].discountType === isSelected) {
            newData.push(data[i]);
          }
          if (data[i].isActive.toString() === isSelected) {
            newData.push(data[i]);
          }
        }
      }
      setCheckPoint(isCheckPoints);
      setFilteredPromotions(newData);

      if (optionData && optionData.length > 0) {
        let isActive = new Set(
          optionData.map((item) => item.isActive.toString())
        );
        let isType = new Set(optionData.map((item) => item.discountType));
        setSelectPromotions([...isType, ...isActive]);
      }
    }
  }, [data, isSelected, isPoints]);
  useEffect(() => {
    dataSuccess();
  }, [dataSuccess]);

  let first = useRef("");
  useEffect(() => {
    if (selectPromotions && selectPromotions.length > 0 && !isSelected) {
      first.current = selectPromotions[0];
      setIsSelected(first.current);
    }
  }, [selectPromotions, isSelected, setIsSelected, first]);

  let limit = 5;
  let offset = currentPage * limit;
  let newListData = filteredPromotions.slice(offset, offset + limit);
  let pageCount = Math.ceil(filteredPromotions.length / limit);

  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };

  const handleChangeOption = (value) => {
    setIsSelected(value);
  };

  const handleClickDelete = (id, code) => {
    setShow(true);
    setItemPromotion({ id, code });
    setStatusPromotion(["delete"]);
  };

  const handleClickSua = (item) => {
    setItemPromotion({ item });
    setStatusPromotion(["update"]);
    toast.success("Vui Lòng Qua Tab Update Khuyến Mãi Để Cập Nhật");
  };

  const formatDiscount = (discount) => {
    if (discount < 100) {
      return `${discount}%`;
    } else {
      return `${discount.toLocaleString()} VND`;
    }
  };

  const handleClickView = (item) => {
    setItemPromotion({ item });
    setStatusPromotion(["chiTiet"]);
    setShow(true);
  };

  const handleClickResetOpen = async (id, type) => {
    if (type === "open") {
      await patchStatusPromotion(
        id,
        setListDataPromotion,
        setIsLoadingPromotion,
        setIsSelected
      );
    } else {
      await patchStatusPromotion(
        id,
        setListDataPromotion,
        setIsLoadingPromotion,
        setIsSelected
      );
    }
  };

  const totalUsedCount =
    listDataPromotion?.data?.promotions?.length > 0 &&
    listDataPromotion?.data?.promotions?.reduce((a, b) => {
      return a + b.usedCount;
    }, 0);

  const handleClickOn = async () => {
    await postResetAllPromotion(setListDataPromotion);
  };

  const handleChangePoints = (e) => {
    setIsPoints(e.target.value);
    setIsCorrect(!isCorrect);
  };
  useEffect(() => {
    if (isCorrect === false) {
      setIsSelected("");
    } else {
      setIsSelected("");
    }
  }, [isCorrect, setIsSelected]);

  /****************************************UPDATE VERSION**************************************8 */
  const handleClickUpdateVersion = (id, code) => {
    setShowUpdateVersion(true);
    setDataUpdateVersion([id, code]);
  };
  return (
    <div className="mt-3 mb-3 table-users">
      <ModalUpdateVersion
        show={showUpdateVersion}
        setShow={setShowUpdateVersion}
        data={dataUpdateVersion}
        setIsLoadingPromotion={setIsLoadingPromotion}
        setListDataPromotion={setListDataPromotion}
      />
      {isLoadingPromotion ? (
        <div className="dialog">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-select">
            <span>Hiện có : {filteredPromotions.length} </span>
            <h1 className="text-center">
              {isSelected === "true"
                ? "Tất cả mã khuyến mãi khả dụng"
                : isSelected === "false"
                ? "Tất cả mã khuyến mãi không khả dụng"
                : `Tất cả mã khuyến mãi ${
                    isSelected === undefined ? "" : isSelected
                  }`}
            </h1>

            <div className="select">
              <select value={isPoints} onChange={handleChangePoints}>
                <option value={POINT}>Có tích điểm</option>
                <option value={NO_POINT}>Không tích điểm</option>
              </select>

              <select
                value={isSelected}
                onChange={(e) => handleChangeOption(e.target.value)}
              >
                {selectPromotions && selectPromotions.length > 0 ? (
                  selectPromotions.map((item, index) => (
                    <option key={index} value={item}>
                      {item === "true"
                        ? "Khả dụng"
                        : item === "false"
                        ? "Không khả dụng"
                        : item}
                    </option>
                  ))
                ) : (
                  <option>Không có dữ liệu</option>
                )}
              </select>
            </div>
          </div>
          <div className="box-progressBar mb-3">
            <div>
              {totalUsedCount > 0 ? (
                <BsToggle2On
                  size={20}
                  color="#007bff"
                  onClick={handleClickOn}
                  style={{ cursor: "pointer" }}
                />
              ) : (
                <BsToggle2Off
                  size={20}
                  color="#FF0000"
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>STT</th>
                <th>Mã giảm giá</th>
                <th>Trạng thái</th>
                <th>Loại mã</th>
                <th>Số tiền giảm</th>
                {checkPoint === undefined && <th>Giới hạn sử dụng</th>}
                <th>{checkPoint === true ? "Điểm thưởng" : "Lượt dùng mã"}</th>
                <th>đã sử dụng</th>
                <th>Phiên bản</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              {newListData.length > 0 ? (
                newListData.map((item, index) => {
                  console.log(newListData, "newListData");
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.code}</td>
                      <td>
                        <div>
                          {item.isActive ? "Khả dụng" : "Không khả dụng"}
                        </div>
                        <div>
                          {item.isActive ? (
                            <BiToggleRight
                              style={{ cursor: "pointer" }}
                              size={20}
                              color="#007bff"
                              onClick={() =>
                                handleClickResetOpen(item._id, "open")
                              }
                            />
                          ) : (
                            <BiToggleLeft
                              style={{ cursor: "pointer" }}
                              size={20}
                              color="#FF0000"
                              onClick={() =>
                                handleClickResetOpen(item._id, "close")
                              }
                            />
                          )}
                        </div>
                      </td>
                      <td>{item.discountType}</td>
                      <td>{formatDiscount(item.discount)}</td>
                      {checkPoint === undefined && (
                        <td>{item.usageLimitPerUser || 0}</td>
                      )}
                      <td>
                        {item.maxUsage
                          ? item.maxUsage
                          : item.requiredPoints || 0}
                      </td>
                      <td>{item.usedCount}</td>
                      <td>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <span>{item.version}</span>
                          <Tag
                            style={{ margin: 0, cursor: "pointer" }}
                            color="#108ee9"
                            onClick={() =>
                              handleClickUpdateVersion(item._id, item.code)
                            }
                          >
                            Cập nhật
                          </Tag>
                        </div>
                      </td>
                      <td
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          className={`btn btn-secondary`}
                          onClick={() => handleClickView(item)}
                        >
                          Xem thêm
                        </button>

                        {item.usedCount === 0 && (
                          <button
                            className="btn btn-danger"
                            onClick={() =>
                              handleClickDelete(item._id, item.code)
                            }
                          >
                            Xóa
                          </button>
                        )}
                        <button
                          className="btn btn-primary"
                          onClick={() => handleClickSua(item)}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={11}> No Data</td>
                </tr>
              )}
            </tbody>
          </Table>
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            pageClassName="page-tem"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLinkClassName="page-link"
            forcePage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default React.memo(TablePromotion);
