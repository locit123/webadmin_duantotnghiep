import React, { useCallback, useEffect, useState } from "react";
import "./ConfiirmTheDish.scss";
import { toast } from "react-toastify";
import { apiTables } from "../../api/AxiosInstall";
import ModalConfirmOrder from "./ModalConfirmOrder";
import { MdTableRestaurant } from "react-icons/md";
const ConfirmTheDish = () => {
  const [listDataTable, setListDataTable] = useState([]);
  const [listDataSuccess, setListDataSuccess] = useState([]);
  const [show, setShow] = useState(false);
  const [dataModal, setDataModal] = useState([]);
  let status = "open";

  /*******************************GET DATA**************************** */
  useEffect(() => {
    getTableApi();
  }, []);

  const getTableApi = async () => {
    try {
      const res = await apiTables.getTable();
      if (res && res.data && res.data.success === "success") {
        setListDataTable(res.data.data);
      }
    } catch (error) {
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  /*******************************SUCCESS DATA**************************** */
  const getDataSuccess = useCallback(() => {
    if (status && listDataTable && listDataTable.length > 0) {
      let newData = [];
      for (let i = 0; i < listDataTable.length; i++) {
        if (listDataTable[i].status === status) {
          newData.push(listDataTable[i]);
        }
      }
      setListDataSuccess(newData);
    }
  }, [status, listDataTable]);

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);

  const handleClickOrder = () => {
    setShow(true);
    setDataModal(listDataSuccess);
  };
  return (
    <>
      <ModalConfirmOrder
        show={show}
        setShow={setShow}
        dataModal={dataModal}
        setDataModal={setDataModal}
      />
      <button
        className="btn btn-primary mx-4 mb-3 bt-order"
        onClick={handleClickOrder}
        disabled={listDataSuccess.length === 0 ? true : false}
      >
        <div className="box-ic">
          <MdTableRestaurant className="ic" color="#0d6efd" />
          <span className="length-order">{listDataSuccess.length || 0}</span>
        </div>
      </button>
    </>
  );
};

export default ConfirmTheDish;
