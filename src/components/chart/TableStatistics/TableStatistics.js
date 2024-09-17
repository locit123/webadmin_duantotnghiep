import React, { useCallback, useEffect, useMemo, useState } from "react";

import LoadingLineChart from "./LoadingLineChart";
import { getTable } from "../../../api/call_api/statistical/fetchApiStatistical";
import { useDispatch, useSelector } from "react-redux";
import { statisticalArrListTableState } from "../../../store/selector";
import { FormatDay4, FormatDay5, FormatDay8 } from "../../../utils/FormDay";
import { LoadingOutlined } from "@ant-design/icons";

const TableStatistics = () => {
  const dispatch = useDispatch();
  const getStateArr = useSelector(statisticalArrListTableState);
  const [month, setMonth] = useState([]);
  const [tableNumber, setTableNumber] = useState([]);
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [selectTableNumber, setSelectTableNumber] = useState("");
  const [dataTableStatistic, setDataTableStatistic] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [isLoading, setIsLoading] = useState(false);
  const [day, setDay] = useState("");
  const [dataDay, setDataDay] = useState([]);
  const [isBooleanDay, setIsBooleanDay] = useState(false);
  /***********************************************GET DATA TABLE****************** */
  const getTableApi = useCallback(async () => {
    if (selectDate) {
      await getTable(selectDate, "", "", dispatch, setIsLoading);
    }
  }, [dispatch, selectDate]);

  useEffect(() => {
    getTableApi();
  }, [getTableApi]);
  /***********************************************GET YEAR****************** */

  const dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(getStateArr.map((item) => FormatDay4(item.timePeriod))),
      ];
    } else {
      return [...new Set(getStateArr.map((item) => item.timePeriod || []))];
    }
  }, [getStateArr, selectDate]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0) {
      let lastYear = dataYear[dataYear.length - 1];
      setSelectYear(lastYear);
    }
  }, [dataYear]);
  /***********************************************GET LAY MONTH AND TABLE****************** */

  const getFilterMonth = useCallback(async () => {
    if (selectYear && getStateArr && getStateArr.length > 0) {
      let newMonth = [];
      let newTableNumber = [];
      for (let i = 0; i < getStateArr.length; i++) {
        if (FormatDay4(getStateArr[i].timePeriod) === selectYear) {
          newMonth.unshift({ month: FormatDay5(getStateArr[i].timePeriod) });
        }
        if (FormatDay5(getStateArr[i].timePeriod) === selectMonth) {
          newTableNumber.unshift({ table: getStateArr[i].tableNumber });
        }
      }

      setMonth(newMonth.length > 0 ? newMonth : []);
      setTableNumber(newTableNumber);
    }
  }, [selectYear, getStateArr, selectMonth]);

  useEffect(() => {
    getFilterMonth();
  }, [getFilterMonth]);
  /***********************************************Xu li SET MONTH AND TABLE****************** */

  let dataMonth = useMemo(() => {
    return [...new Set(month.map((item) => item.month || []))];
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth.length === 0) {
      setSelectMonth("");
    }
  }, [selectMonth, dataMonth]);

  let dataTableNumber = useMemo(() => {
    return [...new Set(tableNumber.map((item) => item.table || []))];
  }, [tableNumber]);

  useEffect(() => {
    if (dataTableNumber && dataTableNumber.length > 0 && !selectTableNumber) {
      setSelectTableNumber(dataTableNumber[0]);
    }
  }, [dataTableNumber, selectTableNumber]);

  /***********************************************SUCCESS DATA****************** */

  const dataSuccess = useCallback(() => {
    if (
      getStateArr &&
      getStateArr.length > 0 &&
      selectMonth &&
      selectYear &&
      selectDate
    ) {
      let newDataDay = [];
      let newData = [];
      for (let i = 0; i < getStateArr.length; i++) {
        if (
          FormatDay5(getStateArr[i].timePeriod) === selectMonth &&
          FormatDay4(getStateArr[i].timePeriod) === selectYear &&
          selectDate === "day"
        ) {
          newDataDay.push(getStateArr[i].timePeriod);
          if (FormatDay8(getStateArr[i].timePeriod) === day) {
            const { tableNumber, totalRevenue, totalOrders, timePeriod } =
              getStateArr[i];
            newData.push({
              tableNumber,
              timePeriod,
              totalRevenue,
              totalOrders,
            });
          }
        }
        if (
          FormatDay5(getStateArr[i].timePeriod) === selectMonth &&
          FormatDay4(getStateArr[i].timePeriod) === selectYear &&
          selectDate === "month"
        ) {
          const { tableNumber, totalRevenue, totalOrders, timePeriod } =
            getStateArr[i];
          newData.push({
            tableNumber,
            timePeriod,
            totalRevenue,
            totalOrders,
          });
        }

        if (
          getStateArr[i].timePeriod === parseInt(selectYear) &&
          selectDate === "year"
        ) {
          console.log(getStateArr[i]);

          const { tableNumber, totalRevenue, totalOrders, timePeriod } =
            getStateArr[i];
          newData.push({
            tableNumber,
            timePeriod,
            totalRevenue,
            totalOrders,
          });
        }
      }
      setDataTableStatistic(newData);
      if (newDataDay && newDataDay.length > 0) {
        let dataSet = new Set(newDataDay.map((item) => FormatDay8(item)));
        setDataDay([...dataSet].reverse());
      }
    }
  }, [getStateArr, selectMonth, selectYear, day, selectDate]);

  useEffect(() => {
    dataSuccess();
  }, [dataSuccess]);

  useEffect(() => {
    if (dataDay && dataDay.length > 0 && !day) {
      setDay(dataDay[0]);
    }
  }, [day, dataDay]);

  useEffect(() => {
    if (isBooleanDay === true) {
      setDay("");
    } else {
      setDay("");
    }
  }, [isBooleanDay]);

  /************************************FIND DATA******************************** */

  return (
    <div className="layout-table-statistical">
      <div className="box-table">
        <div className="select-table mb-2 select">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value={"day"}>Tìm kiếm theo ngày</option>
            <option value={"month"}>Tìm kiếm theo tháng</option>
            <option value={"year"}>Tìm kiếm trong năm</option>
          </select>

          {selectDate === "day" && (
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {dataDay &&
                dataDay.length > 0 &&
                dataDay.map((day, index) => (
                  <option key={index} value={day}>
                    Ngày:{day}
                  </option>
                ))}
            </select>
          )}
          {selectDate !== "year" && (
            <select
              value={selectMonth}
              onChange={(e) => {
                setSelectMonth(e.target.value);
                setIsBooleanDay(!isBooleanDay);
              }}
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
                <option>không có dữ liệu tháng</option>
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
              <option>không có dữ liệu Năm</option>
            )}
          </select>
        </div>
      </div>
      <div className="containerStyle">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : dataTableStatistic && dataTableStatistic.length > 0 ? (
          <LoadingLineChart
            dataTable={dataTableStatistic}
            selectDate={selectDate}
          />
        ) : (
          <div className="text-center py-3 find">Không có dữ liệu</div>
        )}
      </div>
      {}
    </div>
  );
};

export default TableStatistics;
