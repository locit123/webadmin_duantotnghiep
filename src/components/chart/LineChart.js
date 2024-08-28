import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts";
import { ConvertMoney } from "../../utils/convertMoney";
import { FormatDay2 } from "../../utils/FormDay";
import { useSelector } from "react-redux";
import { getThemeState } from "../../store/selector";
const LineChart2 = ({ data }) => {
  console.log("render line chart");
  const theme = useSelector(getThemeState);

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <LineChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, left: 20, right: 10 }}
      >
        <XAxis dataKey="date" stroke={theme ? "white" : ""} />
        <YAxis
          stroke={theme ? "white" : ""}
          tickFormatter={(value) => {
            if (value > 0) {
              return ConvertMoney(value);
            } else {
              return value;
            }
          }}
        />
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
        <CartesianGrid stroke={theme ? "white" : "#e0e0e0"} />

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
