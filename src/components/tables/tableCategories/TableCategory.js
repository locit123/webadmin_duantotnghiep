import React, { useCallback, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesState } from "../../../store/selector";
import ReactPaginate from "react-paginate";
import ModalDeleteCategories from "../../Modal/Categories/ModalDeleteCategories";
import { valueFormCategories } from "../../../store/valueForm/categories/actions";
import { setStatusCategories } from "../../../store/categories/setStatus/actions";
import { LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
import { getAllCategories } from "../../../api/call_api/categories/fetchApiCategory";
const TableCategory = () => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [dataItem, setDataItem] = useState({});
  const dispatch = useDispatch();
  const getDataState = useSelector(getCategoriesState);
  const { dataGetCategories, isLoadingGetCategories } = getDataState;
  const data = dataGetCategories?.data;
  const [dataSort, setDataSort] = useState([]);

  const getApiCategory = useCallback(async () => {
    await getAllCategories(dispatch);
  }, [dispatch]);
  useEffect(() => {
    getApiCategory();
  }, [getApiCategory]);

  //*******************************PHAN TRANG ****************************************/
  const itemPage = 5;
  const offset = current * itemPage;

  console.log(data, "check data category");

  useEffect(() => {
    if (data && data.length > 0) {
      let dataClone = _.cloneDeep(data);
      if (dataClone && dataClone.length > 0) {
        dataClone.reverse();
      }
      setDataSort(dataClone);
    }
  }, [data]);

  const newData = dataSort?.slice(offset, offset + itemPage);

  const pageCount = Math.ceil(dataSort?.length / itemPage);

  const handlePageChange = (selectedPage) => {
    setCurrent(selectedPage.selected);
  };

  useEffect(() => {
    if (current >= pageCount && current > 0) {
      setCurrent(pageCount - 1);
    }
  }, [pageCount, current]);
  //*********************************************************************************** */

  //***************************************DELETE******************************************* */
  const handleClickXoa = (item) => {
    setShow(true);
    setDataItem(item);
  };
  const handleClose = () => {
    setShow(false);
  };

  //***************************************UPDATE******************************************* */
  const handleClickUpdate = (id, name) => {
    dispatch(valueFormCategories.setName(name));
    dispatch(setStatusCategories.setStatus(["update", id, name]));
  };
  return (
    <div className="mt-3 mb-3 table-users">
      <ModalDeleteCategories
        show={show}
        dataItem={dataItem}
        handleClose={handleClose}
        setShow={setShow}
      />

      {isLoadingGetCategories ? (
        <div className="dialog">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <>
          <div className="box-item mb-2">
            <span>Hiện có : {dataGetCategories?.totalCategories} thể loại</span>
            <h1 className="text-center">Tất Cả Thể Loại</h1>
            <span className="sp"></span>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Stt</th>
                <th>Tên</th>
                <th>Lựa Chọn</th>
              </tr>
            </thead>
            <tbody>
              {newData?.length > 0 &&
                newData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{offset + index + 1}</td>
                      <td>{item.name}</td>
                      <td className="bt">
                        <button
                          className="btn btn-danger"
                          onClick={() => handleClickXoa(item)}
                        >
                          Xóa
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleClickUpdate(item._id, item.name)}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
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
            forcePage={current}
          />
        </>
      )}
    </div>
  );
};

export default TableCategory;
