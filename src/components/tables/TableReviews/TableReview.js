import Table from "react-bootstrap/Table";
import React, { useEffect, useState } from "react";
import { getEvent } from "../../../api/call_api/notifications/fetchApiNotifications";
import LoadingNotification from "./LoadingNotification";
import ModalNotification from "./Modal/ModalNotification";
import ReactPaginate from "react-paginate";
import { LoadingOutlined } from "@ant-design/icons";

const TableReview = () => {
  const [listDataEvent, setListDataEvent] = useState([]);
  const [show, setShow] = useState(false);
  const [statusNotification, setStatusNotification] = useState(["create"]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [listNewDataEvent, setListNewDataEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /************************************GET DATA EVENTS******************* */
  useEffect(() => {
    getEventsApi();
  }, []);

  const getEventsApi = async () => {
    await getEvent(setListDataEvent, setIsLoading);
  };

  const handleClickAdd = () => {
    setShow(true);
    setStatusNotification(["create"]);
  };
  /************************************PHAN TRANG******************* */
  let limit = 5;
  let offset = currentPage * limit;

  useEffect(() => {
    const getData = () => {
      if (listDataEvent && listDataEvent.length > 0) {
        let sliceData = listDataEvent.slice(offset, offset + limit);
        let lengthData = Math.ceil(listDataEvent.length / limit);

        setPageCount(lengthData);

        if (JSON.stringify(sliceData) !== JSON.stringify(listNewDataEvent)) {
          setListNewDataEvent(sliceData);
        }
      }
    };
    getData();
  }, [offset, limit, listDataEvent, listNewDataEvent]);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };

  useEffect(() => {
    if (currentPage >= pageCount && currentPage > 0) {
      setCurrentPage(pageCount - 1);
    }
  }, [pageCount, currentPage]);
  console.log(listDataEvent, "check");

  return (
    <>
      <ModalNotification
        show={show}
        setShow={setShow}
        statusNotification={statusNotification}
        setStatusNotification={setStatusNotification}
        setListDataEvent={setListDataEvent}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <button className="btn btn-primary mb-3" onClick={handleClickAdd}>
        Thêm thông báo mới
      </button>

      <div className="mb-3 table-users">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          <>
            <div className="content-user">
              <h1>Hiện có : {listNewDataEvent.length}</h1>
              <h1 className="text-center mb-2 h1">Tất cả thông báo</h1>
              <span></span>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tiêu đề</th>
                  <th>Nội dung</th>
                  <th>Tóm tắt nội dung</th>
                  <th>Ngày tạo</th>
                  <th>Lựa chọn</th>
                </tr>
              </thead>
              <tbody>
                {listNewDataEvent && listNewDataEvent.length > 0 ? (
                  listNewDataEvent.map((item, index) => (
                    <LoadingNotification
                      item={item}
                      key={index}
                      index={index}
                      setStatusNotification={setStatusNotification}
                      setShow={setShow}
                      offset={offset}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>Không có dữ liệu</td>
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
    </>
  );
};

export default TableReview;
