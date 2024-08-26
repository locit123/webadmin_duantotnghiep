import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { apiReviews } from "../../../api/AxiosInstall";
import LoadingReviews from "./LoadingReviews";
import ReactPaginate from "react-paginate";
import ModalReviews from "./ModalReviews";
import { LoadingOutlined } from "@ant-design/icons";
const TableReviewsUsers = () => {
  const [listDataReviews, setListDataReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState("");
  const [listDataPage, setListDataPage] = useState([]);
  const [show, setShow] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    getReviewsApi();
  }, []);
  const getReviewsApi = async () => {
    try {
      setIsLoading(true);
      const res = await apiReviews.getAllReviews();
      if (res && res.data && res.data.status === "success") {
        setIsLoading(false);

        setListDataReviews(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  useEffect(() => {
    if (listDataReviews && listDataReviews.length > 0) {
      listDataReviews.reverse();
    }
  }, [listDataReviews]);
  let limit = 5;
  let offset = currentPage * limit;
  const getDataPage = useCallback(() => {
    if (listDataReviews && listDataReviews.length > 0) {
      let data = listDataReviews.slice(offset, offset + limit);
      let pageCount = Math.ceil(listDataReviews.length / limit);
      setPageCount(pageCount);
      setListDataPage(data);
    }
  }, [listDataReviews, limit, offset]);
  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };
  useEffect(() => {
    getDataPage();
  }, [getDataPage]);

  const handleClick = (item) => {
    setShow(true);
    setMenuItem(item);
  };
  return (
    <div className="table-review-user">
      <ModalReviews show={show} setShow={setShow} menuItem={menuItem} />
      {isLoading ? (
        <div className="box-loading">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-select mb-3">
            <span>Hiện có :{listDataReviews.length} đánh giá</span>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stt</th>
                <th>Họ và tên</th>
                <th>Hình ảnh</th>
                <th>Đánh giá</th>
                <th>Bình luận</th>
                <th>Ngày tạo</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              {listDataPage && listDataPage.length > 0 ? (
                listDataPage.map((item, index) => (
                  <LoadingReviews
                    data={item}
                    index={index}
                    key={index}
                    offset={offset}
                    handleClick={() => handleClick(item.menuItemId)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={7}>không có dữ liệu đánh giá</td>
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

export default TableReviewsUsers;
