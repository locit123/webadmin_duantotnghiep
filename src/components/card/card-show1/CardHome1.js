import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./CardHome1.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { apiStatistical } from "../../../api/AxiosInstall";
import { toast } from "react-toastify";
import { IoFastFood } from "react-icons/io5";
import { FormatDay4, FormatDay5 } from "../../../utils/FormDay";
function CardHome1(props) {
  console.log("render CardHome1");
  const theme = useSelector(getThemeState);
  const [listDataMenuItemStatistical, setListDataMenuItemStatistical] =
    useState([]);
  const [year, setYear] = useState("");
  const [month, setmonth] = useState("");
  const [chooseMonth, setChooseMonth] = useState([]);
  const [listDataSuccess, setListDataSuccess] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [resultPercentage, setResultPercentage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /*********************************GET DATA********************************* */
  useEffect(() => {
    getMenuItemStatistical();
  }, []);

  const getMenuItemStatistical = async () => {
    try {
      setIsLoading(true);
      const res = await apiStatistical.getApiMenuItemStatistical("day", "", "");
      if (res && res.data && res.data.status === "success") {
        setIsLoading(false);

        setListDataMenuItemStatistical(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  /*********************************GET YEAR AND SET YEAR********************************* */
  const dataYear = useMemo(() => {
    if (listDataMenuItemStatistical && listDataMenuItemStatistical.length > 0) {
      return [
        ...new Set(
          listDataMenuItemStatistical.map((item) => FormatDay4(item.timePeriod))
        ),
      ];
    }
  }, [listDataMenuItemStatistical]);

  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !year) {
      setYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setYear("");
    }
  }, [dataYear, year]);
  /*********************************GET MONTH AND SET MONTH********************************* */

  const getDataMonth = useCallback(() => {
    if (
      listDataMenuItemStatistical &&
      listDataMenuItemStatistical.length > 0 &&
      year
    ) {
      let filterData = listDataMenuItemStatistical.filter(
        (item) => FormatDay4(item.timePeriod) === year
      );
      if (filterData) {
        let mapData = filterData.map((item) => FormatDay5(item.timePeriod));
        setmonth(mapData);
      } else {
        setmonth([]);
      }
    }
  }, [listDataMenuItemStatistical, year]);

  useEffect(() => {
    getDataMonth();
  }, [getDataMonth]);

  let dataMonth = useMemo(() => {
    if (month && month.length > 0) {
      return [...new Set(month.map((item) => item) || [])];
    }
  }, [month]);

  useEffect(() => {
    if (dataMonth && dataMonth?.length > 0) {
      setChooseMonth(dataMonth[dataMonth?.length - 1]);
    } else if (dataMonth?.length === 0) {
      setChooseMonth("");
    }
  }, [dataMonth]);
  /*********************************FIND DATA********************************* */
  const getFindDataMonth = useCallback(() => {
    if (
      listDataMenuItemStatistical &&
      listDataMenuItemStatistical.length > 0 &&
      chooseMonth &&
      year
    ) {
      listDataMenuItemStatistical.reduce((arr, curr) => {
        let findData = arr.find(
          (item) =>
            item.timePeriod === curr.timePeriod &&
            FormatDay5(curr.timePeriod) === chooseMonth &&
            FormatDay4(curr.timePeriod) === year
        );

        if (findData) {
          findData.totalQuantity += curr.totalQuantity;
        } else {
          arr.push({ ...curr });
        }
        let newData = [];
        if (arr && arr.length > 0) {
          for (const item of arr) {
            if (
              FormatDay4(item.timePeriod) === year &&
              FormatDay5(item.timePeriod) === chooseMonth
            ) {
              newData.push(item);
            }
          }
        }
        setListDataSuccess(newData.slice(-2));
        return arr;
      }, []);
    }
  }, [listDataMenuItemStatistical, chooseMonth, year]);

  useEffect(() => {
    getFindDataMonth();
  }, [getFindDataMonth]);

  useEffect(() => {
    if (listDataSuccess && listDataSuccess.length > 0) {
      setQuantity(listDataSuccess[listDataSuccess.length - 1]);
      let newTotalPercentage =
        listDataSuccess[1].totalQuantity - listDataSuccess[0].totalQuantity;
      setResultPercentage(newTotalPercentage);
    }
    if (listDataSuccess.length === 0) {
      setQuantity("");
    }
  }, [listDataSuccess]);
  console.log(resultPercentage, "check");

  return (
    <Card
      className={`card-1 ${theme ? "theme" : ""}`}
      title={
        <div className="content-title">
          <div className="content-title-box-1">
            <p className="text-banHang">Món đã bán</p>
            <span className="text-homNay">| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      {isLoading ? (
        <div className="box-loading">
          <LoadingOutlined className="loading" />
        </div>
      ) : (
        <div
          className="content-body"
          title={`Món đã bán hôm qua: ${listDataSuccess[0]?.totalQuantity} món`}
        >
          <div className="icon-cart">
            <div className="ic-ne">
              <IoFastFood className="ic" />
            </div>
          </div>
          <div className="content-body-box-2">
            <h6 className="h6">{quantity.totalQuantity}</h6>
            <div className="span">
              <span>{resultPercentage > 0 ? "tăng" : "giảm"}</span>
              <span className="a">{Math.abs(resultPercentage)}</span>
              <span className="a">món</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default React.memo(CardHome1);
