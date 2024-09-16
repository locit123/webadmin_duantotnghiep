import React from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  Tooltip,
  Legend,
  YAxis,
  Bar,
  ComposedChart,
} from "recharts";
import { ConvertMoney } from "../../../utils/convertMoney";
import { useSelector } from "react-redux";
import { getThemeState } from "../../../store/selector";
const LoadingCustomer = ({ data }) => {
  const theme = useSelector(getThemeState);

  return (
    <ResponsiveContainer width={"100%"} height={320}>
      <ComposedChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 20, bottom: 20, left: 30, right: 30 }}
      >
        <XAxis dataKey="fullName" stroke={theme ? "#fff" : ""} />
        <YAxis
          tickFormatter={(value) => (value > 0 ? ConvertMoney(value) : 0)}
          stroke={theme ? "white" : ""}
        />
        <Tooltip formatter={(value) => ConvertMoney(value)} />
        <Legend />
        <CartesianGrid stroke={theme ? "#fff" : "#e0e0e0"} />
        <Bar
          dataKey="totalAmount"
          name={"Tổng tiền"}
          barSize={20}
          fill="#413ea0"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LoadingCustomer;
