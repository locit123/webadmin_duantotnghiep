import React from "react";
import {
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Bar,
  Line,
  ComposedChart,
} from "recharts";
import { FormatDay2, FormatDay5, FormatDay7 } from "../../../utils/FormDay";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
import { ConvertMoney } from "../../../utils/convertMoney";

const LoadingPayment = ({ data, selectDate }) => {
  const theme = useSelector(getThemeState);

  return (
    <>
      {data && data.length > 0 ? (
        <ResponsiveContainer
          width="100%"
          height={320}
          style={{ padding: "5px 10px" }}
        >
          <ComposedChart data={data} margin={{ top: 20, bottom: 20 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme ? "#fff" : "#e0e0e0"}
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
                  return `Ngày:${FormatDay2(label)}`;
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

            <Tooltip
              formatter={(value, name) => {
                if (
                  name === "Banking" ||
                  name === "Cash" ||
                  name === "ZaloPay"
                ) {
                  return ConvertMoney(value);
                } else {
                  return value;
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
                  return `Ngày:${FormatDay2(label)}`;
                }
              }}
            />
            <Legend />

            <Bar dataKey="Cash" stackId="a" fill="#82ca9d" />
            <Line
              type="monotone"
              dataKey="CashOrder"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              connectNulls={true}
              name="Số lượt giao dịch cash"
            />
            <Bar dataKey="ZaloPay" stackId="a" fill="#8884d8" />
            <Line
              type="monotone"
              dataKey="ZaloPayOrder"
              stroke="#8884d8"
              dot={{ r: 3 }}
              strokeWidth={2}
              connectNulls={true}
              name="Số lượt giao dịch zaloPay"
            />
            <Bar dataKey="Banking" stackId="a" fill="#ffc658" />
            <Line
              type="monotone"
              dataKey="BankingOrder"
              stroke="#ffc658"
              strokeWidth={2}
              connectNulls={true}
              dot={{ r: 3 }}
              name="Số lượt giao dịch banking"
            />
          </ComposedChart>
        </ResponsiveContainer>
      ) : (
        <div style={{ padding: "10px 0", textAlign: "center" }}>
          Không có dữ liệu
        </div>
      )}
    </>
  );
};

export default LoadingPayment;
