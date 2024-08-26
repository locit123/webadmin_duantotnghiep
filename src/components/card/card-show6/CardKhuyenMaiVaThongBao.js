import React, { useCallback, useEffect, useState } from "react";
import { Card } from "antd";
import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";
import "./CardKhuyenMaiVaThongBao.scss";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import { apiNotifications, apiPromotion } from "../../../api/AxiosInstall";
import LoadingKMVaTB from "./LoadingKMVaTB";
import LoadingTb from "./LoadingTb";
const CardKhuyenMaiVaThongBao = (props) => {
  console.log("render cardKhuyenMaiVaThongBao");
  const theme = useSelector(getThemeState);
  const [listDataPromotion, setListDataPromotion] = useState([]);
  const [isActive] = useState(true);
  const [listDataPromotionSuccess, setListDataPromotionSuccess] = useState([]);
  const [listDataNotification, setListDataNotification] = useState([]);
  const [listDataNotificationSuccess, setListDataNotificationSuccess] =
    useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /***************************************GET DATA PROMOTIONS AND NOTIFICATION******************************* */
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setIsLoading(true);

      const [promotions, notifications] = await Promise.all([
        apiPromotion.getApiPromotion(),
        apiNotifications.getApiEvents(),
      ]);

      if (
        promotions &&
        promotions.data &&
        promotions.data.status === "success"
      ) {
        setIsLoading(false);

        setListDataPromotion(promotions.data.data.promotions);
      }
      if (
        notifications &&
        notifications.data &&
        notifications.data.status === "success"
      ) {
        setListDataNotification(notifications.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  /***************************************DATA SUCCESS******************************* */

  const getDataSuccessNotification = useCallback(() => {
    if (listDataNotification && listDataNotification.length > 0) {
      setListDataNotificationSuccess(
        listDataNotification.reverse().slice(0, 10)
      );
    }
  }, [listDataNotification]);
  useEffect(() => {
    getDataSuccessNotification();
  }, [getDataSuccessNotification]);

  /***************************************DATA SUCCESS******************************* */

  const getDataSuccess = useCallback(() => {
    if (
      listDataPromotion &&
      listDataPromotion.length > 0 &&
      isActive === true
    ) {
      let newData = [];
      for (let i = 0; i < listDataPromotion.length; i++) {
        if (
          listDataPromotion[i].isActive === isActive &&
          listDataPromotion[i].usedCount > 0
        ) {
          newData.push(listDataPromotion[i]);
        }
      }
      setListDataPromotionSuccess(newData);
    }
  }, [listDataPromotion, isActive]);

  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);

  return (
    <div style={{ height: `calc(700px - 20px)` }}>
      <PerfectScrollbar>
        <Card
          className={`content-km-tb ${theme ? "theme" : ""}`}
          title={
            <div className="box-title">
              <div className="box-text">
                <p>Khuyến mãi & Thông báo</p>
                <span>| Hôm nay</span>
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
            <div className="box-body">
              <span>
                Hiện có : {listDataPromotionSuccess.length} mã được sử dụng
              </span>

              <table>
                <thead>
                  <tr>
                    <th>Mã giảm giá</th>
                    <th>Lượt dùng mã</th>
                    <th>Đã sử dụng</th>
                  </tr>
                </thead>
                <tbody>
                  {listDataPromotionSuccess &&
                  listDataPromotionSuccess.length > 0 ? (
                    listDataPromotionSuccess.map((item, index) => (
                      <LoadingKMVaTB key={index} data={item} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        không có dữ liệu khuyến mãi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <hr />
              <span>
                Hiện có : {listDataNotificationSuccess.length} thông báo mới
                nhất
              </span>
              <table className="table2">
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tiêu đề</th>
                  </tr>
                </thead>
                <tbody>
                  {listDataNotificationSuccess &&
                  listDataNotificationSuccess.length > 0 ? (
                    listDataNotificationSuccess.map((item, index) => (
                      <LoadingTb key={index} data={item} />
                    ))
                  ) : (
                    <tr>
                      <td>Không có dữ liệu thông báo</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </PerfectScrollbar>
    </div>
  );
};

export default React.memo(CardKhuyenMaiVaThongBao);
