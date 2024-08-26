import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";

const LoadingOrderStatistical = ({ data, selectDate }) => {
  const theme = useSelector(getThemeState);

  return (
    <ResponsiveContainer width={"100%"} height={320}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 50,
          bottom: 5,
        }}
      >
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
          interval={0}
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
        />
        <Legend />
        <Line
          type="monotone"
          name="Tổng lượt đặt món"
          dataKey="totalOrders"
          stroke="#8884d8"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoadingOrderStatistical;
