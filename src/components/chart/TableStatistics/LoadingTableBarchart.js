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
import { FormatDay5 } from "../../../utils/FormDay";
import { ConvertMoney } from "../../../utils/convertMoney";

const CustomBarChart = ({ dataTable }) => {
  console.log(dataTable);

  let formatCode = Array.from(
    new Set(
      dataTable.flatMap((item) =>
        Object.keys(item).filter((key) => key !== "timePeriod")
      )
    )
  );

  const getColors = (index) => {
    let colors = [
      "#8884d8",
      "#8884d8",
      "#82ca9d",
      "#82ca9d",
      "#ffc658",
      "#ffc658",
      "#ff8042",
      "#ff8042",
      "#8dd1e1",
      "#8dd1e1",
      "#2ecc71",
      "#2ecc71",
    ];

    return colors[index % colors.length];
  };

  const formatXAxisLabel = (name) => {
    if (name.startsWith("order_")) {
      const tableNumber = name.split("_")[1];
      return `Tổng lượt đặt bàn ${tableNumber}`;
    } else if (name.startsWith("tableNumber_")) {
      const tableNumber = name.split("_")[1];
      return `Bàn ${tableNumber}`;
    } else {
      return name;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={dataTable}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timePeriod"
          tickFormatter={(label) => {
            return `Tháng:${FormatDay5(label)}`;
          }}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) => `Tháng: ${FormatDay5(label)}`}
          formatter={(value, name) => {
            let displayName = "";
            let displayValue = value;

            if (name.startsWith("order_")) {
              const tableNumber = name.split("_")[1];
              displayName = `Tổng lượt đặt bàn ${tableNumber}`;
            } else if (name.startsWith("tableNumber_")) {
              const tableNumber = name.split("_")[1];
              displayName = `Bàn ${tableNumber}`;
              displayValue = ConvertMoney(value);
            } else {
              displayName = name; // fallback for other keys if any
            }

            return [displayValue, displayName];
          }}
        />
        <Legend formatter={formatXAxisLabel} />
        {formatCode &&
          formatCode.length > 0 &&
          formatCode.map((item, index) => {
            return (
              <Bar
                key={item}
                dataKey={item}
                stackId="a"
                fill={getColors(index)}
                name={formatXAxisLabel(item)}
              />
            );
          })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default React.memo(CustomBarChart);
