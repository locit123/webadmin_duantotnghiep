import { Tag } from "antd";
import React from "react";

const LoadingKMVaTB = ({ data }) => {
  return (
    <tr>
      <th>
        <Tag className="tag" color="#E8900C">
          {data.code}
        </Tag>
      </th>
      <td>
        <Tag className="tag" color="#E8900C">
          {data.maxUsage}
        </Tag>
      </td>
      <td>
        <Tag className="tag" color="#E8900C">
          {data.usedCount}
        </Tag>
      </td>
    </tr>
  );
};

export default LoadingKMVaTB;
