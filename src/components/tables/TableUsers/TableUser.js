import React, { useCallback, useEffect, useMemo, useState } from "react";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import "./TableUser.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersState, getThemeState } from "../../../store/selector";
import moment from "moment";
import { setStatusUsers } from "../../../store/auth/setStatusUsers/actions";
import { getAllUsers } from "../../../api/call_api/auth/fetchApiAuth";
import { AiOutlineSwapRight } from "react-icons/ai";
import _ from "lodash";
import ModalHistoryUser from "./ModalUser/ModalHistoryUser";
import { valueFormUsers } from "../../../store/valueForm/users/actions";
import Lightbox from "react-awesome-lightbox";

const TableUser = ({ role, setRole, setShow }) => {
  console.log("render TableUser");
  const [showHistory, setShowHistory] = useState(false);
  const [item, setItem] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isClick, setIsClick] = useState("up");
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const allUsersState = useSelector(getAllUsersState);
  const { dataGetAllUsers } = allUsersState;
  const data = dataGetAllUsers?.data?.users;
  const [itemCount, setItemCount] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [caption, setCaption] = useState("");
  const [dataListConcat, setDataListConcat] = useState([]);
  /*************************GET DATA ************************** */
  const getApiUsers = useCallback(async () => {
    await getAllUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getApiUsers();
  }, [getApiUsers]);

  const totalPageCount = 5;
  const offset = currentPage * totalPageCount;
  /*************************SET DATA ROLE AND VERIFY ************************** */

  let dataRole = useMemo(() => {
    if (data && data.length > 0) {
      return [...new Set(data.map((item) => item.role) || [])];
    }
  }, [data]);
  let dataVerify = useMemo(() => {
    if (data && data.length > 0) {
      return [...new Set(data.map((item) => item.isVerified) || [])];
    }
  }, [data]);

  useEffect(() => {
    if (
      dataRole &&
      dataRole.length > 0 &&
      dataVerify &&
      dataVerify.length > 0
    ) {
      setDataListConcat(dataRole.concat(dataVerify));
    }
  }, [dataRole, dataVerify]);

  useEffect(() => {
    if (dataListConcat && dataListConcat.length > 0 && !role) {
      setRole(dataListConcat[0]);
    } else if (dataListConcat.length === 0) {
      setRole("");
    }
  }, [dataListConcat, role, setRole]);

  useEffect(() => {
    const listData = () => {
      const itemCount = data
        ?.filter(
          (item) => item.role === role || item.isVerified.toString() === role
        )
        .slice(offset, offset + totalPageCount);

      setItemCount(itemCount);
    };
    listData();
  }, [data, offset, role]);

  const sortedItemCount = useMemo(() => {
    const sortedData = _.cloneDeep(itemCount);
    if (isClick === "up") {
      sortedData?.sort((a, b) => b.fullName.localeCompare(a.fullName));
    } else {
      sortedData?.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    return sortedData;
  }, [itemCount, isClick]);

  const itemPage = data?.filter(
    (item) => item.role === role || item.isVerified.toString() === role
  ).length;

  const totalPage = Math.ceil(itemPage / totalPageCount);

  const handleChange = (e) => {
    setRole(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleClickXoa = (item, e) => {
    e.preventDefault();
    dispatch(setStatusUsers.setStatus(["delete", item]));
    setShow(true);
  };

  const handleClickSort = () => {
    setIsClick((prev) => (prev === "up" ? "down" : "up"));
  };

  const handleClickView = (item) => {
    setItem(item);
    setShowHistory(true);
  };

  const handleClickSua = (item) => {
    setShow(true);
    dispatch(setStatusUsers.setStatus(["update", item]));
    dispatch(valueFormUsers.setFullName(item.fullName));
    dispatch(valueFormUsers.setEmail(item.email));
    dispatch(valueFormUsers.setRole(item.role));
  };

  const handleClickAuthentication = (item) => {
    setShow(true);
    dispatch(setStatusUsers.setStatus(["authentication", item]));
  };

  const handleImageClick = (image, name) => {
    setCurrentImage(image);
    setCaption(name);
    setIsOpen(true);
  };

  return (
    <div className="mt-3 mb-3 table-users">
      <ModalHistoryUser
        show={showHistory}
        setShow={setShowHistory}
        item={item}
      />
      <div>
        <div className="box-h1-select">
          <span>Hiện có:{itemPage}</span>
          <h1 className="text-center mb-2">
            {role === "admin"
              ? "Quản Lý"
              : role === "staff"
              ? "Nhân Viên"
              : role === "client"
              ? "Khách Hàng"
              : role === "true"
              ? "Đã Xác Thực"
              : role === "false"
              ? "Chưa Xác Thực"
              : "Quản Lý Người Dùng"}
          </h1>
          <select value={role} onChange={handleChange}>
            {dataListConcat && dataListConcat.length > 0 ? (
              dataListConcat.map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {item === true
                      ? "Đã xác thực"
                      : item === false
                      ? "Chưa xác thực"
                      : item === "admin"
                      ? "Quản lý"
                      : item === "staff"
                      ? "Nhân viên"
                      : item === "client"
                      ? "Khách hàng"
                      : item}
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
              <th className="th">
                Họ và tên
                <span className="ic-swap" onClick={handleClickSort}>
                  <AiOutlineSwapRight
                    className={`ic-up ${isClick === "up" ? "click" : ""}`}
                  />
                  <AiOutlineSwapRight
                    className={`ic-down ${isClick === "down" ? "click" : ""}`}
                  />
                </span>
              </th>
              <th>Email</th>
              <th>Ảnh</th>
              <th>Vai trò</th>
              <th>Ngày tạo</th>
              <th>Lựa chọn</th>
            </tr>
          </thead>
          <tbody>
            {sortedItemCount?.length > 0 ? (
              sortedItemCount?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{offset + index + 1}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td
                      className="img"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleImageClick(item.img_avatar_url, item.fullName)
                      }
                    >
                      <img
                        alt="avatar"
                        src={item.img_avatar_url}
                        loading="lazy"
                      />
                    </td>
                    <td>
                      {item.role === "client"
                        ? "Khách Hàng"
                        : item.role === "staff"
                        ? "Nhân Viên"
                        : item.role === "admin"
                        ? "Quản Lý"
                        : item.role}
                    </td>
                    <td>
                      {moment(item?.violations?.violation_date).format(
                        "DD-MM-YYYY ~ HH:mm:ss"
                      )}
                    </td>
                    <td>
                      {item.isVerified.toString() === role &&
                        item.isVerified.toString() === "false" && (
                          <button
                            className="btn btn-warning mx-2"
                            onClick={() => handleClickAuthentication(item)}
                          >
                            Xác thực
                          </button>
                        )}
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleClickView(item)}
                      >
                        Chi Tiết
                      </button>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={(e) => handleClickXoa(item, e)}
                        disabled={
                          item.isVerified.toString() === "true" ? true : false
                        }
                      >
                        Xóa
                      </button>
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
                <td colSpan={7}>No data</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {sortedItemCount?.length > 0 && (
        <ReactPaginate
          className={`pagination ${theme ? "theme" : ""} `}
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
      )}
      {currentImage && isOpen && (
        <Lightbox
          image={currentImage}
          title={caption}
          onClose={() => {
            setIsOpen(false);
            setCurrentImage("");
            setCaption("");
          }}
        />
      )}
    </div>
  );
};

export default TableUser;
