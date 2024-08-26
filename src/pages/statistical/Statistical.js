import React from "react";
import PaymentStatistics from "../../components/chart/PaymentStatistics/PaymentStatistics";
import "./Statistical.scss";
import TableStatistics from "../../components/chart/TableStatistics/TableStatistics";
import RevenueStatistic from "../../components/chart/RevenueStatistics/RevenueStatistic";
import MenuItemBestSelling from "../../components/chart/MenuItemBestSelling/MenuItemBestSelling";
import MenuItemStatistical from "../../components/chart/MenuItemStatistical/MenuItemStatistical";
import OrderStatistical from "../../components/chart/OrderStatistical/OrderStatistical";
import AverageStatistical from "../../components/chart/AverageStatistical/AverageStatistical";
import Accordion from "react-bootstrap/Accordion";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const Statistical = () => {
  const theme = useSelector(getThemeState);

  return (
    <div className={`layout-statistical ${theme ? "theme" : ""}`}>
      <div className="box-row3">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Thống kê thanh toán</Accordion.Header>
            <Accordion.Body>
              <PaymentStatistics />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Thống kê bàn</Accordion.Header>
            <Accordion.Body>
              <TableStatistics />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Thống kê doanh thu</Accordion.Header>
            <Accordion.Body>
              <RevenueStatistic />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Thống kê món ăn ngon</Accordion.Header>
            <Accordion.Body>
              <MenuItemBestSelling />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Thống kê món ăn</Accordion.Header>
            <Accordion.Body>
              <MenuItemStatistical />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Thống kê lượt đặt món</Accordion.Header>
            <Accordion.Body>
              <OrderStatistical />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Thống kê trung bình tổng tiền</Accordion.Header>
            <Accordion.Body>
              <AverageStatistical />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Statistical;
