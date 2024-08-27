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
import { getThemeState } from "../../../store/selector";
import { useSelector } from "react-redux";

function CustomTooltip({ active, payload, selectDate }) {
  if (active && payload && payload.length) {
    const { timePeriod, totalAmount, name } = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#fff",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p>
          {selectDate === "day"
            ? `Ngày: ${FormatDay7(timePeriod)}`
            : selectDate === "month"
            ? `Tháng: ${FormatDay5(timePeriod)}`
            : `Năm: ${timePeriod}`}
        </p>
        <p>{`Tổng tiền: ${ConvertMoney(totalAmount)}`}</p>
        <p>{`Họ và tên: ${name}`}</p>
      </div>
    );
  }

  return null;
}

const LoadingCustomer = ({ data, selectDate }) => {
  const theme = useSelector(getThemeState);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, left: 30, right: 30, bottom: 20 }}
        >
          <XAxis
            dataKey="timePeriod"
            tickFormatter={(value) => {
              if (selectDate === "day") {
                return `Ngày:${FormatDay7(value)}`;
              } else if (selectDate === "month") {
                return `Tháng${FormatDay5(value)}`;
              } else {
                return `Năm:${value}`;
              }
            }}
            stroke={theme ? "white" : ""}
          />
          <YAxis
            tickFormatter={(value) => {
              if (value > 0) {
                return ConvertMoney(value);
              } else {
                return value;
              }
            }}
            stroke={theme ? "white" : ""}
          />
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme ? "white" : "#e0e0e0"}
          />

          <Tooltip content={<CustomTooltip selectDate={selectDate} />} />
          <Legend />
          <Bar dataKey="totalAmount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoadingCustomer;
