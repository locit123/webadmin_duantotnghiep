import React, { useCallback, useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./CardHome3.scss";
import { useDispatch, useSelector } from "react-redux";
import { dailyState, getThemeState } from "../../../store/selector";
import { apiStatistical } from "../../../api/AxiosInstall";
import { toast } from "react-toastify";
import { setDataDailyStatistics } from "../../../store/statisticals/daily-statistical/actionDaily";
import { FormatDay5 } from "../../../utils/FormDay";
import { FaUsers } from "react-icons/fa";
function CardHome3(props) {
  console.log("render CardHome3");
  const theme = useSelector(getThemeState);
  const dispatch = useDispatch();
  const getDataState = useSelector(dailyState);
  const [listDataUser, setListDataUser] = useState([]);
  const [totalUser, setTotalUser] = useState({});
  const [totalUserMonth, setTotalUserMonth] = useState("");
  const [listNewData, setListNewData] = useState([]);
  console.log("aaaaaaaaaaaaaaaaaa");

  /*******************************************GET DATA ********************************************88*/
  const getDailyApi = useCallback(async () => {
    try {
      const res = await apiStatistical.getApiDailyStatistical();
      if (res && res.data && res.data.status === "success") {
        dispatch(setDataDailyStatistics(res.data.data));
      }
    } catch (error) {
      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  }, [dispatch]);
  useEffect(() => {
    getDailyApi();
  }, [getDailyApi]);
  /*******************************************DATA SUCCESS ********************************************88*/
  useEffect(() => {
    if (getDataState && getDataState.length > 0) {
      let findData = getDataState.find((item) => item.name === "Người Dùng");
      if (findData) {
        setListDataUser(findData.data);
      }
    } else if (getDataState.length === 0) {
      setListDataUser([]);
    }
  }, [getDataState]);

  const getDataSuccess = useCallback(() => {
    if (listDataUser && listDataUser.length > 0) {
      let result = listDataUser.reduce((arr, curr) => {
        let findData = arr.find(
          (item) => FormatDay5(item.date) === FormatDay5(curr.date)
        );

        if (findData) {
          findData.totalUser += curr.totalUser;
        } else {
          arr.push({ ...curr });
        }
        return arr;
      }, []);
      if (result) {
        setTotalUser(result[result.length - 1]);
        setListNewData(result.slice(-2));
      } else {
        setTotalUser("");
      }
    }
  }, [listDataUser]);
  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);

  useEffect(() => {
    if (listNewData && listNewData.length > 0) {
      let total = listNewData[1].totalUser - listNewData[0].totalUser;
      setTotalUserMonth(total);
    } else if (listNewData.length === 0) {
      setTotalUserMonth("");
    }
  }, [listNewData]);

  return (
    <Card
      className={`card-3 ${theme ? "theme" : ""}`}
      title={
        <div className="content-title">
          <div className="content-title-box-1">
            <p className="text-banHang">khách hàng đặt món</p>
            <span className="text-homNay">| tháng này</span>
          </div>
          <EllipsisOutlined className="icon-ellips" />
        </div>
      }
      bordered={false}
    >
      <div
        className="content-body-3"
        title={`Tháng trước:${listNewData[0].totalUser} lượt đặt món`}
      >
        <div className="icon-userGroup">
          <div className="ic-ne">
            <FaUsers className="ic" />
          </div>
        </div>
        <div className="content-body-box-2">
          <h6 className="h6">{totalUser.totalUser}</h6>
          <div className="span">
            <span>{totalUserMonth > 0 ? "Tăng" : "Giảm"}</span>
            <span>{Math.abs(totalUserMonth)} lượt đặt món</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default React.memo(CardHome3);
