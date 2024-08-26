import React from "react";
import "./CardDatBan.scss";
import { Card, Layout, Tag } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
const CardDatBan = (props) => {
  console.log("render CardDatBan");
  const theme = useSelector(getThemeState);
  return (
    <Layout className="layout-card-ban">
      <Card
        className={`content-ban-gan-day ${theme ? "theme" : ""}`}
        title={
          <div className="box-title">
            <div className="item-text">
              <p>Đặt bàn online</p>
              <span>| Hôm nay</span>
            </div>
            <EllipsisOutlined className="icon-ellips" />
          </div>
        }
        bordered={false}
      >
        <div className="box-body">
          <div className="box-danh-muc">
            <div className="item-1">
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <span>mục trang</span>
            </div>
            <div className="item-2">
              <input placeholder="Tìm Kiếm..." title="tìm kiếm trong bảng" />
            </div>
          </div>
          <table className="table-body">
            <thead>
              <tr>
                <th>Id</th>
                <th>Khách hàng</th>
                <th>Bàn đặt</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mr Tỏn</td>
                <td>1</td>
                <td>
                  <Tag color={"#108ee9"}>success</Tag>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </Layout>
  );
};

export default React.memo(CardDatBan);
