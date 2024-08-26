import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMenuItemState,
  getCategoriesState,
  getThemeState,
} from "../../../store/selector";
import "./TableMenu.scss";
import LoadingTableMenu from "./LoadingTableMenu";
import { LoadingOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import { getAllMenuItem } from "../../../api/call_api/menuItem/fetchApiMenuItem";
import { getAllCategories } from "../../../api/call_api/categories/fetchApiCategory";
import { AiOutlineSwapRight } from "react-icons/ai";
import _ from "lodash";
import Lightbox from "react-awesome-lightbox";

const TableMenu = ({ setShow, setShowOption }) => {
  console.log("TABLE MENU");
  const [category, setCategory] = useState("Món khai vị");
  const [currentPage, setCurrentPage] = useState(0);
  const [isClick, setIsClick] = useState("up");
  const theme = useSelector(getThemeState);
  const getMenuItemState = useSelector(getAllMenuItemState);
  const [dataSort, setDataSort] = useState([]);
  const { dataMenuItem, isLoadingMenuItem } = getMenuItemState;
  const data = dataMenuItem?.data;
  const categoriesState = useSelector(getCategoriesState);
  const { dataGetCategories } = categoriesState;
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [title, setTitle] = useState("");

  const getApiMenuItem = useCallback(async () => {
    await getAllMenuItem(dispatch);
  }, [dispatch]);
  useEffect(() => {
    getApiMenuItem();
  }, [getApiMenuItem]);

  const getApiCategory = useCallback(async () => {
    await getAllCategories(dispatch);
  }, [dispatch]);
  useEffect(() => {
    getApiCategory();
  }, [getApiCategory]);

  /************************************* PHAN TRANG************************************** */
  const itemPage = 5;
  const offset = currentPage * itemPage;

  useEffect(() => {
    if (data && data.length > 0) {
      let dataClone = _.cloneDeep(data);
      if (isClick === "up") {
        dataClone.sort((a, b) => a.price - b.price);
      } else {
        dataClone.sort((a, b) => b.price - a.price);
      }
      setDataSort(dataClone);
    }
  }, [data, isClick]);

  const itemList = dataSort
    ?.filter((item) => category === item.category)
    .slice(offset, offset + itemPage);
  const pageCount = dataSort?.filter(
    (item) => category === item.category
  ).length;
  const totalPage = Math?.ceil(pageCount / itemPage);

  const handlePageChange = useCallback((selectedPage) => {
    setCurrentPage(selectedPage.selected);
  }, []);
  const handleChangSelect = (e) => {
    setCategory(e.target.value);
    setCurrentPage(0);
  };
  useEffect(() => {
    if (currentPage >= totalPage && currentPage > 0) {
      setCurrentPage(totalPage - 1);
    }
  }, [totalPage, currentPage]);
  /************************************************************************************* */
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

  const handleClickImage = (image, name) => {
    setIsOpen(true);
    setCurrentImage(image);
    setTitle(name);
  };
  console.log(currentImage, title);
  return (
    <div className="mt-3 mb-3 table-users">
      {isLoadingMenuItem ? (
        <div className="box-loading text-center">
          <LoadingOutlined className={`loading ${theme ? "theme" : ""}`} />
        </div>
      ) : (
        <>
          <div className="box-users">
            <h1>Hiện có : {pageCount} món ăn</h1>
            <h1 className="text-center">{category}</h1>
            <div className="select">
              <select value={category} onChange={handleChangSelect}>
                {dataGetCategories?.data?.length > 0 &&
                  dataGetCategories?.data?.map((item, index) => {
                    return (
                      <option value={item.name} key={index}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên Món</th>
                <th>Tên Tiếng Anh</th>
                <th>Mô Tả</th>
                <th>
                  Giá Tiền
                  <span className="ic-swap" onClick={handleClickSort}>
                    <AiOutlineSwapRight
                      className={`ic-up ${isClick === "up" ? "click" : ""}`}
                    />
                    <AiOutlineSwapRight
                      className={`ic-down ${isClick === "down" ? "click" : ""}`}
                    />
                  </span>
                </th>
                <th>Ảnh Món</th>
                <th>Đánh Giá</th>
                <th>Thể Loại</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              {itemList?.length > 0 ? (
                itemList?.map((item, index) => (
                  <LoadingTableMenu
                    key={index}
                    item={item}
                    index={index}
                    offset={offset}
                    category={category}
                    setShow={setShow}
                    setShowOption={setShowOption}
                    onClick={() => handleClickImage(item.image_url, item.name)}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={9}>No data</td>
                </tr>
              )}
            </tbody>
          </Table>
          <ReactPaginate
            className={`pagination`}
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPage}
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
    </div>
  );
};

export default React.memo(TableMenu);
