import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { apiReviews } from "../../../api/AxiosInstall";
import LoadingReviews from "./LoadingReviews";
import ReactPaginate from "react-paginate";
import ModalReviews from "./ModalReviews";
import { LoadingOutlined } from "@ant-design/icons";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
const TableReviewsUsers = () => {
  const [listDataReviews, setListDataReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState("");
  const [listDataPage, setListDataPage] = useState([]);
  const [show, setShow] = useState(false);
  const [menuItem, setMenuItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");
  const [select, setSelect] = useState("");
  const [listDataSuccess, setListDataSuccess] = useState([]);
  /************************************GET DATA*******************************8 */
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

  /*************************************GET ROLE AND CREATED AT AND RANTING*******************************8 */
  const getDataSelect = useMemo(() => {
    if (listDataReviews && listDataReviews.length > 0) {
      const uniqueDates = new Set();
      const uniqueRating = new Set();
      let date = [];

      for (let i = 0; i < listDataReviews.length; i++) {
        if (listDataReviews[i].createdAt) {
          uniqueDates.add(listDataReviews[i].createdAt);
        }
        if (listDataReviews[i].rating) {
          uniqueRating.add(listDataReviews[i].rating);
        }
      }

      let resultRating = Array.from(uniqueRating).sort((a, b) => a - b);
      let resultDates = Array.from(uniqueDates);
      if (resultDates && resultDates.length > 0) {
        date.push(resultDates[resultDates.length - 1]);
      }
      return resultRating.concat(date);
    }

    return [];
  }, [listDataReviews]);

  useEffect(() => {
    if (getDataSelect && getDataSelect.length > 0 && !select) {
      setSelect(String(getDataSelect[0]));
    } else if (getDataSelect.length === 0) {
      setSelect("");
    }
  }, [getDataSelect, select]);

  /*************************************DATA SUCCESS*******************************8 */
  const getDataSuccess = useCallback(() => {
    if (listDataReviews && listDataReviews.length > 0 && select) {
      let newData = [];
      for (let i = 0; i < listDataReviews.length; i++) {
        if (listDataReviews[i].rating.toString() === select) {
          newData.push(listDataReviews[i]);
        }
        if (listDataReviews[i].createdAt === select) {
          newData.push(listDataReviews[i]);
        }
      }

      if (newData) {
        setListDataSuccess(newData);
      }
    }
  }, [listDataReviews, select]);

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  /*************************************PHAN PAGE*******************************8 */
  let limit = 5;
  let offset = currentPage * limit;
  const getDataPage = useCallback(() => {
    if (listDataSuccess && listDataSuccess.length > 0) {
      let data = listDataSuccess.slice(offset, offset + limit);
      let pageCount = Math.ceil(listDataSuccess.length / limit);
      setPageCount(pageCount);
      setListDataPage(data);
    }
  }, [listDataSuccess, limit, offset]);
  useEffect(() => {
    getDataPage();
  }, [getDataPage]);

  const handlePageChange = (s) => {
    setCurrentPage(s.selected);
  };

  useEffect(() => {
    if (currentPage > 0 && currentPage >= pageCount) {
      setCurrentPage(pageCount - 1);
    }
  }, [currentPage, pageCount]);

  const handleClick = (item) => {
    setShow(true);
    setMenuItem(item);
  };

  const handleClickImage = (image, name) => {
    setIsOpen(true);
    setCurrentImage(image);
    setTitle(name);
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
            <span>Hiện có :{listDataSuccess.length} đánh giá</span>
            <select value={select} onChange={(e) => setSelect(e.target.value)}>
              {getDataSelect && getDataSelect.length > 0 ? (
                getDataSelect.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      {typeof item === "number"
                        ? `${item} sao`
                        : "Đánh giá mới nhất"}
                    </option>
                  );
                })
              ) : (
                <option>Không có dữ liệu</option>
              )}
            </select>
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
                    handleClickImage={() =>
                      handleClickImage(
                        item.userId.img_avatar_url,
                        item.userId.fullName
                      )
                    }
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
      {isOpen && (
        <div className="lightbox-wrapper">
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            carousel={{ finite: true }}
            className="lightbox"
            plugins={[Captions]}
            slides={[
              {
                src: currentImage,
                width: 3840,
                height: 2560,
                title: <span className="ban">Họ và tên: {title}</span>,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default TableReviewsUsers;
