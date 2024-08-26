import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useSelector, useDispatch } from "react-redux";
import ReactPaginate from "react-paginate";
import "./TableTable.scss";
import ModalDeleteTable from "../../Modal/Tables/ModalDeleteTable";
import { getTableState } from "../../../store/selector";
import { LoadingOutlined } from "@ant-design/icons";
import { typeActionSetStatus } from "../../../store/tables/setStatus/actions";
import { valueFormTable } from "../../../store/valueForm/tables/actions";
import LoadingTable from "./LoadingTable";
import { getAllTable } from "../../../api/call_api/tables/fetchApiTable";
import { toast } from "react-toastify";
import { AiOutlineSwapRight } from "react-icons/ai";
import Lightbox from "react-awesome-lightbox";

import _ from "lodash";
const TableTable = () => {
  console.log("render TableTable");
  const [currentPage, setCurrentPage] = useState(0);
  const [show, setShow] = useState(false);
  const [itemTable, setItemTable] = useState({});
  const [status, setStatus] = useState("all");
  const table = useSelector(getTableState);
  const [isClick, setIsClick] = useState("up");
  const [dataSort, setDataSort] = useState([]);
  const { isLoading, dataTable } = table;
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");
  let data = dataTable?.data;
  const dispatch = useDispatch();
  const getApiTable = useCallback(async () => {
    await getAllTable(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getApiTable();
  }, [getApiTable]);

  //XU LI PHAN TRANG
  const itemsPerPage = 5;
  const offset = currentPage * itemsPerPage;
  // Filter currentItems based on status

  useEffect(() => {
    if (data && data.length > 0) {
      let dataClone = _.cloneDeep(data);
      if (isClick === "up") {
        dataClone.sort((a, b) => a.tableNumber - b.tableNumber);
      } else {
        dataClone.sort((a, b) => b.tableNumber - a.tableNumber);
      }
      setDataSort(dataClone);
    }
  }, [data, isClick]);

  const currentItems = dataSort
    ?.filter((item) => item?.status === status || status === "all")
    .slice(offset, offset + itemsPerPage);

  const itemCount = dataSort?.filter(
    (item) => item?.status === status || status === "all"
  ).length;
  const pageCount = Math.ceil(itemCount / itemsPerPage);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setCurrentPage(0); // Reset currentPage when status changes
  };
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  //----------------------------DELETE------------------------------------
  const handleClickDelete = (item) => {
    if (!item) {
      console.log("item not found");
    }
    setShow(true);
    setItemTable(item);
  };
  //----------------------------Update------------------------------------

  const handleClickUpdateTable = async (id, tableNumber) => {
    dispatch(typeActionSetStatus.setStatusTable(["update", id]));
    dispatch(valueFormTable.setTableNumber(tableNumber));
    toast.success("Vui lòng qua tab để cập nhật");
  };
  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);
  /**********************************TOGGLE ***************************** */
  const dataTitle = [...new Set(data?.map((item) => item.status))];

  const handleClickSort = () => {
    if (isClick === "up") {
      setIsClick("down");
      return;
    }
    if (isClick === "down") {
      setIsClick("up");
      return;
    }
  };

  const handleClickImage = (qr, tableNumber) => {
    setIsOpen(true);
    setCurrentImage(qr);
    setTitle(`Bàn ${tableNumber}`);
  };
  console.log(currentImage, title);

  return (
    <div className="mt-3 mb-3 layout">
      {isLoading ? (
        <div className="dialog">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-h1-span mb-2">
            <span>{`Hiện Có ${itemCount} Bàn`}</span>
            <h1 className="text-center ">
              {status === "all"
                ? "Tất Cả Bàn"
                : status === "open"
                ? "Bàn đang mở"
                : "Bàn đang đóng"}
            </h1>
            <div className="select">
              <select value={status} onChange={handleStatusChange}>
                <option value={"all"}>Tất Cả</option>
                {dataTitle.map((item, index) => (
                  <option value={item} key={index}>
                    {item === "open" ? "Mở" : "Đóng"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>
                  Số Bàn
                  <span className="ic-swap" onClick={handleClickSort}>
                    <AiOutlineSwapRight
                      className={`ic-up ${isClick === "up" ? "click" : ""}`}
                    />
                    <AiOutlineSwapRight
                      className={`ic-down ${isClick === "down" ? "click" : ""}`}
                    />
                  </span>
                </th>
                <th>Ảnh QR</th>
                <th>Trạng Thái</th>
                <th>Lựa Chọn</th>
              </tr>
            </thead>
            <tbody>
              {currentItems && currentItems?.length > 0 ? (
                currentItems.map((item, index) => (
                  <LoadingTable
                    key={index}
                    item={item}
                    handleClickDelete={handleClickDelete}
                    handleClickUpdateTable={handleClickUpdateTable}
                    status={status}
                    onClick={() =>
                      handleClickImage(item.qrCode, item.tableNumber)
                    }
                  />
                ))
              ) : (
                <tr>
                  <td className="col-span" colSpan={3}>
                    No Data
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {currentItems?.length > 0 ? (
            <div className="text-center">
              <ReactPaginate
                className={`pagination`}
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
            </div>
          ) : null}
        </>
      )}
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

      <ModalDeleteTable
        show={show}
        handleClose={() => setShow(false)}
        itemTable={itemTable}
        setShow={setShow}
      />
    </div>
  );
};

export default TableTable;
