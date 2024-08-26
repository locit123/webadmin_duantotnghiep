import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import "./CardBanChayNhat.scss";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { toast } from "react-toastify";
import { apiStatistical } from "../../../api/AxiosInstall";
import { FormatDay4 } from "../../../utils/FormDay";
import LoadingBanChay from "./LoadingBanChay";
function CardBanChayNhat(props) {
  console.log("render CardBanChayNhat");
  const theme = useSelector(getThemeState);
  const [listDataMenuItem, setListDataMenuItem] = useState([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [listDataSuccess, setListDataSuccess] = useState([]);
  /************************************GET DATA*********************************88 */
  useEffect(() => {
    getMenuItemBestSelling();
  }, []);

  const getMenuItemBestSelling = async () => {
    try {
      const res = await apiStatistical.getApiMenuItemStatisticalBestSelling(
        "day",
        "",
        ""
      );
      if (res && res.data && res.data.status === "success") {
        setListDataMenuItem(res.data.data);
      }
    } catch (error) {
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  /************************************SELECT YEAR AND SET YEAR*********************************88 */
  const dataYear = useMemo(() => {
    if (listDataMenuItem && listDataMenuItem.length > 0) {
      return [
        ...new Set(
          listDataMenuItem.map((item) => FormatDay4(item.timePeriod)) || []
        ),
      ];
    }
  }, [listDataMenuItem]);

  useEffect(() => {
    if (dataYear && dataYear?.length > 0 && !year) {
      setYear(dataYear[dataYear?.length - 1]);
    } else if (dataYear?.length === 0) {
      setYear("");
    }
  }, [dataYear, year]);
  /************************************SELECT MONTH*********************************88 */

  useEffect(() => {
    if (year && listDataMenuItem && listDataMenuItem.length > 0) {
      let newData = [];
      for (const item of listDataMenuItem) {
        if (FormatDay4(item.timePeriod) === year) {
          newData.push(item.timePeriod);
        }
      }
      setMonth(newData[newData.length - 1]);
    }
  }, [listDataMenuItem, year]);
  /************************************SUCCESS DATA*********************************88 */

  const dataSuccess = useCallback(() => {
    if (year && listDataMenuItem && listDataMenuItem.length > 0 && month) {
      let newData = [];
      for (let i = 0; i < listDataMenuItem.length; i++) {
        if (
          listDataMenuItem[i].timePeriod === month &&
          FormatDay4(listDataMenuItem[i].timePeriod) === year
        ) {
          if (listDataMenuItem[i].totalQuantity >= 3) {
            newData.push(listDataMenuItem[i]);
          }
        }
      }
      setListDataSuccess(newData);
    }
  }, [year, month, listDataMenuItem]);

  useEffect(() => {
    dataSuccess();
  }, [dataSuccess]);

  return (
    <Card
      className={`content-ban-chay-nhat ${theme ? "theme" : ""}`}
      title={
        <div className="box-title">
          <div className="box-text">
            <p>Món chạy nhất</p>
            <span>| Hôm nay</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="content-body">
        <table className="content-box">
          <thead>
            <tr>
              <th>Stt</th>
              <th>Tên món</th>
              <th>Số lượng đã bán</th>
              <th>Ngày bán</th>
            </tr>
          </thead>
          <tbody>
            {listDataSuccess && listDataSuccess.length > 0 ? (
              listDataSuccess.map((item, index) => (
                <LoadingBanChay item={item} index={index} key={index} />
              ))
            ) : (
              <tr>
                <td colSpan={4}>Không có dữ liệu món bán chạy</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default React.memo(CardBanChayNhat);
