import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  EllipsisOutlined,
  DollarOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import "./CardHome2.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { apiStatistical } from "../../../api/AxiosInstall";
import { toast } from "react-toastify";
import { FormatDay4 } from "../../../utils/FormDay";
import { ConvertMoney, ConvertMoney2 } from "../../../utils/convertMoney";
function CardHome2() {
  console.log("render CardHome2");
  const theme = useSelector(getThemeState);
  const [listDataRevenue, setListDataRevenue] = useState([]);
  const [year, setYear] = useState("");
  const [totalRevenue, setTotalRevenue] = useState("");
  const [totalPercentage, setTotalPercentage] = useState("");
  const [listDataSuccess, setListDataSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /******************************************GET DATA************************** */
  useEffect(() => {
    getRevenueApi();
  }, []);
  const getRevenueApi = async () => {
    try {
      setIsLoading(true);

      const res = await apiStatistical.getApiRevenueStatistical(
        "month",
        "",
        ""
      );
      if (res && res.data && res.data.status === "success") {
        setIsLoading(false);

        setListDataRevenue(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  /******************************************GET YEAR AND SELECT YEAR************************** */

  let dataYear = useMemo(() => {
    if (listDataRevenue && listDataRevenue.length > 0) {
      return [
        ...new Set(listDataRevenue.map((item) => FormatDay4(item._id)) || []),
      ];
    }
  }, [listDataRevenue]);

  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !year) {
      setYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setYear("");
    }
  }, [dataYear, year]);
  /******************************************GET DATA SUCCESS************************** */
  const getDataSuccess = useCallback(() => {
    if (listDataRevenue && listDataRevenue.length > 0 && year) {
      let newData = [];
      for (let i = 0; i < listDataRevenue.length; i++) {
        if (FormatDay4(listDataRevenue[i]._id) === year) {
          if (listDataRevenue[i]) {
            newData.push(listDataRevenue[i]);
          }
        }
      }
      setListDataSuccess(newData);
    }
  }, [listDataRevenue, year]);

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);
  useEffect(() => {
    if (listDataSuccess && listDataSuccess.length > 0) {
      setTotalRevenue(listDataSuccess[0]);
      let newTotalPercentage =
        ((listDataSuccess[0].totalRevenue - listDataSuccess[1].totalRevenue) /
          listDataSuccess[1].totalRevenue) *
        100;
      setTotalPercentage(newTotalPercentage.toFixed(2));
    } else if (listDataSuccess.length === 0) {
      setTotalRevenue("");
    }
  }, [listDataSuccess]);

  return (
    <Card
      className={`card-2 ${theme ? "theme" : ""}`}
      title={
        <div className="content-title">
          <div className="content-title-box-1">
            <p className="text-banHang">Doanh thu</p>
            <span className="text-homNay">| Tháng này</span>
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
          className="content-body-2"
          title={`Tổng doanh thu tháng trước:${ConvertMoney(
            listDataSuccess[1].totalRevenue
          )}`}
        >
          <div className="icon-dollar">
            <div className="ic-ne">
              <DollarOutlined className="ic" />
            </div>
          </div>
          <div className="content-body-box-2">
            <h6 className="h6">{ConvertMoney2(totalRevenue.totalRevenue)}</h6>
            <div className="span">
              <span>{totalPercentage > 0 ? "tăng" : "giảm"}</span>
              <span>{totalPercentage}%</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export default React.memo(CardHome2);
