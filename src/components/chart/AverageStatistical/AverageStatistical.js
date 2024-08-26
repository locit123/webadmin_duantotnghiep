import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getAverage } from "../../../api/call_api/statistical/fetchApiStatistical";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import LoadingAverageStatistical from "./LoadingAverageStatistical";
import { LoadingOutlined } from "@ant-design/icons";
import { FcSearch } from "react-icons/fc";
import FindStatistical from "../../findStatistical/FindStatistical";

const AverageStatistical = () => {
  const [listDataAverage, setListDataAverage] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectMonth, setSelectMonth] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [month, setMonth] = useState([]);
  const [listDataAverageSuccess, setListDataAverageSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [runDate, setRunDate] = useState(false);
  /****************************************GET DATA ************************/
  const getAverageApi = useCallback(async () => {
    if (selectDate !== "find") {
      setStarDate("");
      setEndDate("");
      setRunDate(false);
      await getAverage(selectDate, "", "", setListDataAverage, setIsLoading);
    }
  }, [selectDate]);

  useEffect(() => {
    getAverageApi();
  }, [getAverageApi]);
  /****************************************GET YEAR AND SELECT YEAR ************************/
  let dataYear = useMemo(() => {
    if (listDataAverage && listDataAverage.length > 0) {
      if (selectDate !== "year") {
        return [
          ...new Set(listDataAverage.map((item) => FormatDay4(item._id) || [])),
        ];
      } else {
        return [...new Set(listDataAverage.map((item) => item._id || []))];
      }
    }
  }, [listDataAverage, selectDate]);
  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);

  /****************************************GET MONTH AND SELECT MONTH ************************/
  const getMonth = useCallback(() => {
    if (listDataAverage && listDataAverage.length > 0 && selectYear) {
      let dataFilter = listDataAverage.filter(
        (item) => FormatDay4(item._id) === selectYear
      );
      setMonth(dataFilter);
    }
  }, [selectYear, listDataAverage]);
  useEffect(() => {
    getMonth();
  }, [getMonth]);

  let dataMonth = useMemo(() => {
    if (month && month.length > 0) {
      return [...new Set(month.map((item) => FormatDay5(item._id)))];
    }
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth?.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[0]);
    } else if (dataMonth?.length === 0) {
      setSelectMonth("");
    }
  }, [dataMonth, selectMonth]);
  /****************************************SUCCESS DATA ************************/

  const getDataSuccess = useCallback(() => {
    if (
      listDataAverage &&
      listDataAverage.length > 0 &&
      selectDate &&
      selectMonth &&
      selectYear
    ) {
      let newData = [];
      for (let i = 0; i < listDataAverage.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay5(listDataAverage[i]._id) === selectMonth &&
            FormatDay4(listDataAverage[i]._id) === selectYear
          ) {
            newData.unshift(listDataAverage[i]);
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(listDataAverage[i]._id) === selectYear) {
            newData.unshift(listDataAverage[i]);
          }
        }
        if (selectDate === "year") {
          if (listDataAverage[i]._id === parseInt(selectYear)) {
            newData.unshift(listDataAverage[i]);
          }
        }
        if (selectDate === "find" && starDate && endDate && runDate) {
          newData.unshift(listDataAverage[i]);
        }
      }
      setListDataAverageSuccess(newData);
    }
  }, [
    listDataAverage,
    selectDate,
    selectYear,
    selectMonth,
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
    await getAverage(
      "day",
      starDate,
      endDate,
      setListDataAverage,
      setIsLoading
    );
  };
  return (
    <div className="layout-average-statistical">
      <div className="content-average ">
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
          {selectDate === "day" && (
            <select
              value={selectMonth}
              onChange={(e) => setSelectMonth(e.target.value)}
            >
              {dataMonth && dataMonth.length ? (
                dataMonth.map((month, i) => {
                  return (
                    <option key={i} value={month}>
                      {month}
                    </option>
                  );
                })
              ) : (
                <option>Không có dữ liệu tháng</option>
              )}
            </select>
          )}
          {selectDate !== "find" ? (
            <select
              value={selectYear}
              onChange={(e) => setSelectYear(e.target.value)}
            >
              {dataYear && dataYear.length > 0 ? (
                dataYear.map((year, i) => {
                  return (
                    <option key={i} value={year}>
                      {year}
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
        ) : listDataAverageSuccess && listDataAverageSuccess.length > 0 ? (
          <LoadingAverageStatistical
            data={listDataAverageSuccess}
            selectDate={selectDate}
          />
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

export default AverageStatistical;
