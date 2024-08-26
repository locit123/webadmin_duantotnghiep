import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoadingMenuItem from "./LoadingMenuItem";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
import { LoadingOutlined } from "@ant-design/icons";
import { getMenuitemBestSelling } from "../../../api/call_api/statistical/fetchApiStatistical";
import FindStatistical from "../../findStatistical/FindStatistical";
import { FcSearch } from "react-icons/fc";

const MenuItemBestSelling = () => {
  const [listMenuitem, setListMenuitem] = useState([]);
  const [selectDate, setSelectDate] = useState("day");
  const [selectYear, setSelectYear] = useState("");
  const [selectMonth, setSelectMonth] = useState("");
  const [dataFilterMonth, setDataFilterMonth] = useState([]);
  const [dataMenuitem, setDataMenuitem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [starDate, setStarDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [runDate, setRunDate] = useState(false);
  /******************************************GET API MENU ITEM*************************** */
  const getMenuitemApi = useCallback(async () => {
    if (selectDate !== "find") {
      setStarDate("");
      setEndDate("");
      setRunDate(false);
      await getMenuitemBestSelling(
        selectDate,
        "",
        "",
        setListMenuitem,
        setIsLoading
      );
    }
  }, [selectDate]);

  useEffect(() => {
    getMenuitemApi();
  }, [getMenuitemApi]);

  /******************************************GET YEAR AND SELECT YEAR*************************** */

  let dataYear = useMemo(() => {
    if (selectDate !== "year") {
      return [
        ...new Set(listMenuitem.map((item) => FormatDay4(item.timePeriod))),
      ];
    } else {
      return [...new Set(listMenuitem.map((item) => item.timePeriod))];
    }
  }, [selectDate, listMenuitem]);

  useEffect(() => {
    if (dataYear && dataYear.length > 0 && !selectYear) {
      setSelectYear(dataYear[dataYear.length - 1]);
    } else if (dataYear.length === 0) {
      setSelectYear("");
    }
  }, [dataYear, selectYear]);
  /******************************************GET Month AND SELECT Month*************************** */
  const getDataMonth = useCallback(() => {
    if (listMenuitem && listMenuitem.length > 0 && selectYear) {
      let dataFilter = listMenuitem.filter(
        (item) => FormatDay4(item.timePeriod) === selectYear
      );
      if (dataFilter) {
        setDataFilterMonth(dataFilter);
      } else {
        setDataFilterMonth([]);
      }
    }
  }, [listMenuitem, selectYear]);

  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);
  const dataMonth = useMemo(() => {
    if (dataFilterMonth && dataFilterMonth.length > 0 && selectYear) {
      return [
        ...new Set(
          dataFilterMonth.map((item) => FormatDay5(item.timePeriod) || [])
        ),
      ];
    }
  }, [dataFilterMonth, selectYear]);

  useEffect(() => {
    if (dataMonth && dataMonth?.length > 0 && !selectMonth) {
      setSelectMonth(dataMonth[dataMonth?.length - 1]);
    } else if (dataMonth?.length === 0) {
      setSelectMonth([]);
    }
  }, [dataMonth, selectMonth]);
  /******************************************CONVERT DATA*************************** */

  let result = listMenuitem.reduce((arr, curr) => {
    const { timePeriod, totalQuantity, name } = curr;

    if (!arr[timePeriod]) {
      arr[timePeriod] = { timePeriod };
    }

    arr[timePeriod][name] = totalQuantity;

    return arr;
  }, []);

  let formatResult = Object.values(result);

  /******************************************SUCCESS DATA*************************** */
  const menuitemSuccessData = useCallback(() => {
    if (
      formatResult &&
      formatResult.length > 0 &&
      selectMonth &&
      selectYear &&
      selectDate
    ) {
      let newData = [];
      for (let i = 0; i < formatResult.length; i++) {
        if (selectDate === "day") {
          if (
            FormatDay5(formatResult[i].timePeriod) === selectMonth &&
            FormatDay4(formatResult[i].timePeriod) === selectYear
          ) {
            newData.push(formatResult[i]);
          }
        }
        if (selectDate === "month") {
          if (FormatDay4(formatResult[i].timePeriod) === selectYear) {
            newData.push(formatResult[i]);
          }
        }
        if (selectDate === "year") {
          if (formatResult[i].timePeriod === parseInt(selectYear)) {
            newData.push(formatResult[i]);
          }
        }
        if (selectDate === "find" && starDate && endDate && runDate) {
          newData.push(formatResult[i]);
        }
      }

      if (JSON.stringify(newData) !== JSON.stringify(dataMenuitem)) {
        setDataMenuitem(newData);
      }
    }
  }, [
    formatResult,
    selectDate,
    selectMonth,
    selectYear,
    dataMenuitem,
    starDate,
    endDate,
    runDate,
  ]);
  useEffect(() => {
    menuitemSuccessData();
  }, [menuitemSuccessData]);
  /************************************FIND DATA******************************** */
  const handleClickFind = async () => {
    setRunDate(true);
    await getMenuitemBestSelling(
      "day",
      starDate,
      endDate,
      setListMenuitem,
      setIsLoading
    );
  };
  return (
    <div className="layout-menuitem-best-selling">
      <div className="box-menuitem">
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
              {dataMonth && dataMonth.length > 0 ? (
                dataMonth.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      Tháng:{item}
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
                dataYear.map((item, index) => {
                  return (
                    <option value={item} key={index}>
                      Năm:{item}
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
        <div className="containerStyle">
          {isLoading ? (
            <div className="box-loading text-center">
              <LoadingOutlined className="loading" />
            </div>
          ) : dataMenuitem && dataMenuitem.length > 0 ? (
            <LoadingMenuItem data={dataMenuitem} selectDate={selectDate} />
          ) : (
            <div className="text-center py-3 find">
              Vui lòng nhập ngày bắt đầu và ngày kết thúc để bắt đầu tìm kiếm{" "}
              <FcSearch size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemBestSelling;
