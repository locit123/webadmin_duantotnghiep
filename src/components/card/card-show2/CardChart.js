import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import "./CardChart.scss";
import { useSelector } from "react-redux";
import { dailyState, getThemeState } from "../../../store/selector";
import { FormatDay5 } from "../../../utils/FormDay";
import LineChart from "../../chart/LineChart";
const CardChart = (props) => {
  console.log("render CardChart");
  const theme = useSelector(getThemeState);
  const getDataState = useSelector(dailyState);
  const [month, setMonth] = useState("");
  const [dataMonth, setDataMonth] = useState([]);
  const [listDataSuccess, setListDataSuccess] = useState([]);
  /**********************************XU LI MONTH NEW AND SET MONTH******************************* */
  useEffect(() => {
    if (getDataState && getDataState.length > 0) {
      let filterData = getDataState.filter(
        (item) => item.name === "Người Dùng"
      );
      if (filterData) {
        setDataMonth(filterData[0].data);
      }
    }
  }, [getDataState]);

  const getDataMonth = useMemo(() => {
    if (dataMonth && dataMonth.length > 0) {
      return [...new Set(dataMonth.map((item) => FormatDay5(item.date)) || [])];
    }
  }, [dataMonth]);
  useEffect(() => {
    if (getDataMonth && getDataMonth?.length > 0 && !month) {
      setMonth(getDataMonth[getDataMonth?.length - 1]);
    } else if (getDataMonth?.length === 0) {
      setMonth("");
    }
  }, [getDataMonth, month]);
  /**********************************XU LI DATA =REDUCE******************************* */

  const dataReduce = useCallback(() => {
    if (getDataState && getDataState.length > 0 && month) {
      const result = getDataState.reduce((dataArr, nameCurr) => {
        const { name, data } = nameCurr;
        data.forEach((dataCurr) => {
          const { date, totalOrder, totalRevenue, totalUser } = dataCurr;
          if (FormatDay5(date) === month) {
            if (!dataArr[date]) {
              dataArr[date] = { date };
            }
            if (name === "Bán Hàng") {
              dataArr[date]["Bán Hàng"] = totalOrder;
            } else if (name === "Doanh Thu") {
              dataArr[date]["Doanh Thu"] = totalRevenue;
            } else if (name === "Người Dùng") {
              dataArr[date]["Người Dùng"] = totalUser;
            }
          }
        });

        return dataArr;
      }, {});
      const finalData = Object.values(result);
      setListDataSuccess(finalData);
      return finalData;
    }
  }, [getDataState, month]);

  useEffect(() => {
    dataReduce();
  }, [dataReduce]);

  console.log(listDataSuccess, "check");

  return (
    <Card
      className={`cart-chart ${theme ? "theme" : ""}`}
      title={
        <div className="box-title">
          <div className="box-text">
            <p className="text-baoCao">Báo cáo</p>
            <span className="text-homNay">| Tháng này</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div className="box-body">
        <LineChart data={listDataSuccess} />
      </div>
    </Card>
  );
};

export default React.memo(CardChart);
