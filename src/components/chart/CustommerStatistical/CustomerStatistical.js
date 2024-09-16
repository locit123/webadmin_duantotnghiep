import React, { useEffect, useState } from "react";
import { getCustomer } from "../../../api/call_api/statistical/fetchApiStatistical";
import { LoadingOutlined } from "@ant-design/icons";
import LoadingCustomer from "./LoadingCustomer";

const CustomerStatistical = () => {
  const [listDataCustomer, setListDataCustomer] = useState([]);
  const [listDataSuccess, setListDataSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /*******************************************GET API PAYMENT********************************** */
  useEffect(() => {
    getCustomerApi();
  }, []);

  const getCustomerApi = async () => {
    await getCustomer(setListDataCustomer, setIsLoading);
  };

  /*******************************************DATA-SUCCESS********************************* */
  useEffect(() => {
    if (listDataCustomer && listDataCustomer.length > 0) {
      let newData = [];
      for (let i = 0; i < listDataCustomer.length; i++) {
        newData.push({
          totalAmount: listDataCustomer[i].totalAmount,
          fullName: listDataCustomer[i].fullName,
        });
      }
      setListDataSuccess(newData);
    }
  }, [listDataCustomer]);
  console.log(listDataSuccess, "listDataSuccess");

  return (
    <div className="layout-customer">
      <div className="containerStyle">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : listDataSuccess && listDataSuccess.length > 0 ? (
          <LoadingCustomer data={listDataSuccess} />
        ) : (
          <div>Không có dữ liệu khách hàng</div>
        )}
      </div>
    </div>
  );
};

export default CustomerStatistical;
