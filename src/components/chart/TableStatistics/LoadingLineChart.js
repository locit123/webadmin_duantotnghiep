import React from "react";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
  ComposedChart,
  Bar,
} from "recharts";
import { FormatDay5, FormatDay7 } from "../../../utils/FormDay";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { ConvertMoney } from "../../../utils/convertMoney";

const LoadingLineChart = ({ dataTable, selectDate }) => {
  const theme = useSelector(getThemeState);

  return (
    <>
      {dataTable && dataTable.length > 0 ? (
        <>
          <ResponsiveContainer
            width={"100%"}
            height={320}
            style={{ padding: "5px 10px" }}
          >
            <ComposedChart data={dataTable} margin={{ top: 20 }}>
              <XAxis
                dataKey={
                  selectDate === "day" ||
                  selectDate === "year" ||
                  selectDate === "find"
                    ? "tableNumber"
                    : "timePeriod"
                }
                tickFormatter={(value) => {
                  if (
                    selectDate === "day" ||
                    selectDate === "year" ||
                    selectDate === "find"
                  ) {
                    return `Bàn: ${value}`;
                  } else {
                    return `Tháng: ${FormatDay5(value)}`;
                  }
                }}
                stroke={theme ? "white" : ""}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => {
                  if (value > 0) {
                    return ConvertMoney(value);
                  } else {
                    return value;
                  }
                }}
                stroke={theme ? "white" : ""}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `${value.toLocaleString("vi-VN")}`}
                stroke={theme ? "white" : ""}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === "Tổng tiền bàn") {
                    return `${value.toLocaleString("vi-VN")} VND`;
                  }
                  return value;
                }}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    let time = payload[0].payload.timePeriod;
                    let tableNumber = payload[0].payload.tableNumber;
                    if (selectDate === "day") {
                      return `Bàn: ${label} - Ngày: ${FormatDay7(time)}`;
                    } else if (selectDate === "year") {
                      return `Bàn: ${label} - Năm: ${time}`;
                    } else if (selectDate === "month") {
                      return `Bàn: ${tableNumber} - Tháng: ${FormatDay5(time)}`;
                    } else if (selectDate === "find") {
                      return `Bàn: ${label} - Ngày: ${FormatDay7(time)}`;
                    }
                  }
                  return `Bàn: ${label}`;
                }}
              />
              <Legend />
              <CartesianGrid stroke={theme ? "white" : "#e0e0e0"} />
              <Bar
                yAxisId="left"
                dataKey="Tổng tiền bàn"
                barSize={20}
                fill="#413ea0"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Tổng lượt đặt bàn"
                stroke="#ff7300"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div style={{ padding: "10px 0", textAlign: "center" }}>
          Không có dữ liệu
        </div>
      )}
    </>
  );
};

export default React.memo(LoadingLineChart);
