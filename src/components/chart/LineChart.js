import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { ConvertMoney } from "../../utils/convertMoney";
import { FormatDay2 } from "../../utils/FormDay";
const LineChart2 = ({ data }) => {
  console.log("render line chart");

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip
          labelFormatter={(label) => `Ngày: ${FormatDay2(label)}`}
          formatter={(value, name) => {
            if (name === "Doanh Thu") {
              return ConvertMoney(value);
            } else {
              return value;
            }
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="Bán Hàng"
          name="Món đã bán"
          stroke="#8884d8"
        />
        <Line type="monotone" dataKey="Doanh Thu" stroke="#82ca9d" />
        <Line
          type="monotone"
          dataKey="Người Dùng"
          name="Số lượt khách đặt"
          stroke="#ffc658"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default React.memo(LineChart2);
