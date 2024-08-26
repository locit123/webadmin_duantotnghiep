import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";
import { ConvertMoney } from "../../../utils/convertMoney";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
const LoadingAverageStatistical = ({ data, selectDate }) => {
  const theme = useSelector(getThemeState);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ left: 20, top: 20 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={theme ? "#fff" : "#e0e0e0"}
        />
        <XAxis
          dataKey="_id"
          tickFormatter={(label) => {
            if (selectDate === "day") {
              return `Ngày:${FormatDay7(label)}`;
            } else if (selectDate === "month") {
              return `Tháng:${FormatDay5(label)}`;
            } else if (selectDate === "year") {
              return `Năm:${label}`;
            } else {
              return `Ngày:${FormatDay7(label)}`;
            }
          }}
          stroke={theme ? "#fff" : ""}
        />
        <YAxis
          tickFormatter={(label) => {
            if (label) {
              return label ? `${ConvertMoney(label)}` : 0;
            } else {
              return label;
            }
          }}
          stroke={theme ? "#fff" : ""}
        />
        <Tooltip
          labelFormatter={(label) => {
            if (selectDate === "day") {
              return `Ngày:${FormatDay7(label)}`;
            } else if (selectDate === "month") {
              return `Tháng:${FormatDay5(label)}`;
            } else if (selectDate === "year") {
              return `Năm:${label}`;
            } else {
              return `Ngày:${FormatDay7(label)}`;
            }
          }}
          formatter={(value, name) => {
            if (name === "Tổng doanh thu") {
              return `${ConvertMoney(value)}`;
            } else if (name === "Tổng Trung bình doanh thu") {
              return `${ConvertMoney(value)}`;
            } else {
              return value;
            }
          }}
        />
        <Legend />
        <Bar dataKey="totalRevenue" name={"Tổng doanh thu"} fill="#8884d8" />
        <Bar dataKey="totalOrders" name={"Số lượt giao dịch"} fill="#82ca9d" />
        <Bar
          dataKey="averageOrderValue"
          name={"Tổng Trung bình doanh thu"}
          fill="#ffc658"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LoadingAverageStatistical;
