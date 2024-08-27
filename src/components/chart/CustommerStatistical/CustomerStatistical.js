import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getCustomer } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingCustomer from "./LoadingCustomer";
import { LoadingOutlined } from "@ant-design/icons";

const CustomerStatistical = () => {
  const [selectDate, setSelectDate] = useState("day");
  const [listDataCustomer, setListDataCustomer] = useState([]);
  const [selectYear, setSelectYear] = useState("");
  const [month, setMonth] = useState([]);
  const [selectMonth, setSelectMonth] = useState("");
  const [listDataSuccess, setListDataSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /*******************************************GET API PAYMENT********************************** */
  const getCustomerApi = useCallback(async () => {
    if (selectDate) {
      await getCustomer(selectDate, setListDataCustomer, setIsLoading);
    }
  }, [selectDate]);
  useEffect(() => {
    getCustomerApi();
  }, [getCustomerApi]);
  /*******************************************GET YEAR AND SELECT YEAR********************************** */
  const dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(
          listDataCustomer.map((item) => FormatDay4(item.timePeriod) || [])
        ),
      ];
    } else {
      return [
        ...new Set(listDataCustomer.map((item) => item.timePeriod || [])),
      ];
    }
  }, [listDataCustomer, selectDate]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear.length - 1]);
    } else if (dataYear.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /*******************************************GET MONTH AND SELECT MONTH********************************** */
  const getDataMonth = useCallback(() => {
    if (listDataCustomer && listDataCustomer.length > 0 && selectYear) {
      let filterData = listDataCustomer.filter(
        (item) => FormatDay4(item.timePeriod) === selectYear
      );
      if (filterData) {
        setMonth(filterData);
      }
    }
  }, [listDataCustomer, selectYear]);

  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);

  const dataMonth = useMemo(() => {
    return [...new Set(month.map((item) => FormatDay5(item.timePeriod)) || [])];
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && selectYear && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth.length === 0) {
      setSelectMonth("");
    }
  }, [dataMonth, selectYear, selectMonth]);
  /*******************************************DATA-SUCCESS********************************* */
  const getSuccess = useCallback(() => {
    if (
      listDataCustomer &&
      listDataCustomer.length > 0 &&
      selectMonth &&
      selectYear
    ) {
      let newData = [];
      for (let i = 0; i < listDataCustomer.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay4(listDataCustomer[i].timePeriod) === selectYear &&
            FormatDay5(listDataCustomer[i].timePeriod) === selectMonth
          ) {
            newData.push({
              timePeriod: listDataCustomer[i].timePeriod,
              totalAmount: listDataCustomer[i].totalAmount,
              name: listDataCustomer[i].name,
            });
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(listDataCustomer[i].timePeriod) === selectYear) {
            newData.push({
              timePeriod: listDataCustomer[i].timePeriod,
              totalAmount: listDataCustomer[i].totalAmount,
              name: listDataCustomer[i].name,
            });
          }
        }
        if (selectDate === "year") {
          if (listDataCustomer[i].timePeriod === parseInt(selectYear)) {
            newData.push({
              timePeriod: listDataCustomer[i].timePeriod,
              totalAmount: listDataCustomer[i].totalAmount,
              name: listDataCustomer[i].name,
            });
          }
        }
      }
      setListDataSuccess(newData);
    }
  }, [listDataCustomer, selectMonth, selectYear, selectDate]);
  useEffect(() => {
    getSuccess();
  }, [getSuccess]);
  return (
    <div className="layout-customer">
      <div className="box-customer">
        <div className="find-data mb-2 select">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value={"day"}>Tìm kiếm theo ngày</option>
            <option value={"month"}>Tìm kiếm trong tháng</option>
            <option value={"year"}>Tìm kiếm trong năm</option>
          </select>
          {selectDate === "day" && (
            <select
              value={selectMonth}
              onChange={(e) => setSelectMonth(e.target.value)}
            >
              {dataMonth && dataMonth.length > 0 ? (
                dataMonth.map((month, index) => {
                  return (
                    <option key={index} value={month}>
                      Tháng:{month}
                    </option>
                  );
                })
              ) : (
                <option>Không có dữ liệu tháng</option>
              )}
            </select>
          )}
          <select
            value={selectYear}
            onChange={(e) => setSelectYear(e.target.value)}
          >
            {dataYear && dataYear.length > 0 ? (
              dataYear.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    Năm:{year}
                  </option>
                );
              })
            ) : (
              <option>Không có dữ liệu năm</option>
            )}
          </select>
        </div>
      </div>
      <div className="containerStyle">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : (
          listDataSuccess &&
          listDataSuccess.length > 0 && (
            <LoadingCustomer data={listDataSuccess} selectDate={selectDate} />
          )
        )}
      </div>
    </div>
  );
};

export default CustomerStatistical;
