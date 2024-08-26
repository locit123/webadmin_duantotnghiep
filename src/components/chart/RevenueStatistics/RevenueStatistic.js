import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoadingRevenue from "./LoadingRevenue";
import { getRevenue } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import { LoadingOutlined } from "@ant-design/icons";
import { FcSearch } from "react-icons/fc";
import FindStatistical from "../../findStatistical/FindStatistical";
const RevenueStatistic = () => {
  const [listRevenue, setListRevenue] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [dataFindMonth, setDataFindMonth] = useState([]);
  const [dataRevenue, setDataRevenue] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [runDate, setRunDate] = useState(false);
  /****************************************GET API REVENUE*********************** */
  const getRevenueApi = useCallback(async () => {
    if (selectDate !== "find") {
      setStarDate("");
      setEndDate("");
      setRunDate(false);
      await getRevenue(selectDate, "", "", setListRevenue, setIsLoading);
    }
  }, [selectDate]);
  useEffect(() => {
    getRevenueApi();
  }, [getRevenueApi]);
  /****************************************GET YEAR AND SELECT-YEAR*********************** */
  let dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(listRevenue.map((item) => FormatDay4(item._id) || [])),
      ];
    } else {
      return [...new Set(listRevenue.map((item) => item._id) || [])];
    }
  }, [listRevenue, selectDate]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear.length - 1]);
    } else if (dataYear.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /****************************************GET MONTH AND SELECT-MONTH*********************** */
  const getDataMonth = useCallback(() => {
    if (listRevenue && listRevenue.length > 0 && selectYear) {
      let newDataMonth = [];
      for (let i = 0; i < listRevenue.length; i++) {
        if (FormatDay4(listRevenue[i]._id) === selectYear) {
          newDataMonth.push(listRevenue[i]._id);
        }
      }
      setDataFindMonth(newDataMonth);
    }
  }, [listRevenue, selectYear]);

  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);

  const dataMonth = useMemo(() => {
    return [...new Set(dataFindMonth.map((item) => FormatDay5(item)))];
  }, [dataFindMonth]);

  useEffect(() => {
    if (dataMonth && dataMonth.length > 0 && selectYear && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth.length === 0 && !selectYear) {
      setSelectMonth("");
    }
  }, [selectYear, dataMonth, selectMonth]);

  /****************************************FOR FIND SUCCESS DATA *********************** */
  const getDataSuccess = useCallback(() => {
    if (listRevenue && listRevenue.length > 0 && selectYear && selectMonth) {
      let newDataRevenue = [];
      for (let i = 0; i < listRevenue.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay5(listRevenue[i]._id) === selectMonth &&
            FormatDay4(listRevenue[i]._id) === selectYear
          ) {
            newDataRevenue.unshift({
              _id: listRevenue[i]._id,
              "Tổng doanh thu": listRevenue[i].totalRevenue,
              "Tổng lượt thanh toán": listRevenue[i].totalOrders,
            });
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(listRevenue[i]._id) === selectYear) {
            newDataRevenue.unshift({
              _id: listRevenue[i]._id,
              "Tổng doanh thu": listRevenue[i].totalRevenue,
              "Tổng lượt thanh toán": listRevenue[i].totalOrders,
            });
          }
        }
        if (selectDate === "year") {
          if (listRevenue[i]._id === parseInt(selectYear)) {
            newDataRevenue.push({
              _id: listRevenue[i]._id,
              "Tổng doanh thu": listRevenue[i].totalRevenue,
              "Tổng lượt thanh toán": listRevenue[i].totalOrders,
            });
          }
        }
        if (selectDate === "find" && starDate && endDate && runDate) {
          newDataRevenue.unshift({
            _id: listRevenue[i]._id,
            "Tổng doanh thu": listRevenue[i].totalRevenue,
            "Tổng lượt thanh toán": listRevenue[i].totalOrders,
          });
        }
      }
      setDataRevenue(newDataRevenue);
    }
  }, [
    listRevenue,
    selectYear,
    selectMonth,
    selectDate,
    starDate,
    endDate,
    runDate,
  ]);
  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  /************************************FIND DATA******************************** */
  const handleClickFind = async () => {
    setRunDate(true);
    await getRevenue("day", starDate, endDate, setListRevenue, setIsLoading);
  };
  console.log(runDate, "check");

  return (
    <div className="layout-revenue">
      <div className="box-revenue">
        <div className="box-date mb-2 select">
          <select
            value={selectDate}
            onChange={(e) => setSelectDate(e.target.value)}
          >
            <option value={"day"}>Tìm kiếm theo ngày</option>
            <option value={"month"}>Tìm kiếm theo tháng</option>
            <option value={"year"}>Tìm kiếm trong năm</option>
            <option value={"find"}>Tìm kiếm trong khoảng</option>
          </select>
          <div className="box-month">
            {selectDate === "day" && (
              <select
                value={selectMonth}
                onChange={(e) => setSelectMonth(e.target.value)}
              >
                {dataMonth && dataMonth.length ? (
                  dataMonth.map((month, index) => {
                    return (
                      <option value={month} key={index}>
                        Tháng:{month}
                      </option>
                    );
                  })
                ) : (
                  <option>Không có dữ liệu tháng</option>
                )}
              </select>
            )}
          </div>
          {selectDate !== "find" ? (
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
          ) : (
            <div className="box-find">
              <FindStatistical
                handleClickFind={handleClickFind}
                valueStart={starDate}
                onChangeStart={(e) => setStarDate(e.target.value)}
                valueEnd={endDate}
                onChangeEnd={(e) => setEndDate(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div className="containerStyle">
        {isLoading ? (
          <div className="box-loading text-center">
            <LoadingOutlined className="loading" />
          </div>
        ) : dataRevenue && dataRevenue.length > 0 ? (
          <LoadingRevenue data={dataRevenue} selectDate={selectDate} />
        ) : (
          <div className="text-center py-3 find">
            Vui lòng nhập ngày bắt đầu và ngày kết thúc để bắt đầu tìm kiếm{" "}
            <FcSearch size={20} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueStatistic;
