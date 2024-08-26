import React from "react";

const LoadingTb = ({ data }) => {
  return (
    <tr>
      <th>
        {Array.isArray(data.image_url) && data.image_url.length > 0 ? (
          <div className="img">
            <img loading="lazy" src={data.image_url[0]} alt="anh" />
          </div>
        ) : (
          <span>Không có ảnh</span>
        )}
      </th>
      <td>{data.title}</td>
    </tr>
  );
};

export default LoadingTb;
