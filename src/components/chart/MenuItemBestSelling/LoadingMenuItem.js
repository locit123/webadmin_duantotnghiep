import React from "react";
import {
  Tooltip,
  CartesianGrid,
  XAxis,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";
import { getThemeState } from "../../../store/selector";
import { useSelector } from "react-redux";
const LoadingMenuItem = ({ data, selectDate }) => {
  const theme = useSelector(getThemeState);

  const dataKeys = Array.from(
    new Set(
      data.flatMap((item) =>
        Object.keys(item).filter((key) => key !== "timePeriod")
      )
    )
  );

  // Hàm sinh màu sắc động dựa trên chỉ số
  const generateColor = (index) => {
    const colors = [
      "#8884d8",
      "#e3a0d7",
      "#f39c12",
      "#e74c3c",
      "#3498db",
      "#2ecc71",
      "#C2B2B4",
      "#6B4E71",
    ];
    return colors[index % colors.length];
  };
  return (
    <div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={theme ? "white" : "#e0e0e0"}
          />
          <XAxis
            dataKey="timePeriod"
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
            stroke={theme ? "white" : ""}
          />
          <Tooltip
            formatter={(value, name) => {
              if (name) {
                return `đã bán ${value}`;
              }
            }}
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
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={generateColor(index)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LoadingMenuItem;
