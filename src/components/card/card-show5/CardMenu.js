import React, { useCallback, useEffect, useState } from "react";
import "./CardMenu.scss";
import { Card } from "antd";
import { EllipsisOutlined, LoadingOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import { apiMenuItem } from "../../../api/AxiosInstall";
import LoadingCardMenu from "./LoadingCardMenu";
const CardMenu = (props) => {
  console.log("render CardMenu");
  const theme = useSelector(getThemeState);
  const [listDataMenuItem, setListDataMenuItem] = useState([]);
  const [category] = useState("Món chính");
  const [listDataMenuItemSuccess, setListDataMenuItemSuccess] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /******************************GET DATA******************************* */
  useEffect(() => {
    getMenuItemApi();
  }, []);
  const getMenuItemApi = async () => {
    try {
      setIsLoading(true);

      const res = await apiMenuItem.getMenuItem();
      if (res && res.data && res.data.success === "success") {
        setIsLoading(false);
        setListDataMenuItem(res.data.data);
      }
    } catch (error) {
      setIsLoading(false);

      const status = error?.response?.data?.status;
      const message = error?.response?.data?.message;
      toast.error(status || message);
    }
  };
  /******************************DATA SUCCESS******************************* */
  const getDataSuccess = useCallback(() => {
    if (listDataMenuItem && listDataMenuItem.length > 0 && category) {
      let newData = [];
      for (let i = 0; i < listDataMenuItem.length; i++) {
        if (listDataMenuItem[i].category === category) {
          newData.push(listDataMenuItem[i]);
        }
      }
      setListDataMenuItemSuccess(newData);
    }
  }, [listDataMenuItem, category]);
  useEffect(() => {
    getDataSuccess();
  }, [getDataSuccess]);

  return (
    <div style={{ height: `calc(600px - 20px)` }}>
      <PerfectScrollbar>
        <Card
          className={`content-dat-ban ${theme ? "theme" : ""}`}
          title={
            <div className="box-title">
              <div className="box-text">
                <p>Thực đơn món chính</p>
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
              <span>Hiện có : {listDataMenuItemSuccess.length} món</span>
              <table>
                <thead>
                  <tr>
                    <th>Hình ảnh</th>
                    <th>Tên Món</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {listDataMenuItemSuccess &&
                  listDataMenuItemSuccess.length > 0 ? (
                    listDataMenuItemSuccess.map((item, index) => (
                      <LoadingCardMenu key={index} data={item} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>Không có dữ liệu món</td>
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

export default React.memo(CardMenu);
