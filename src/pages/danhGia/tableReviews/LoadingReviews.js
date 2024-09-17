import React from "react";
import { FormatDay2, FormatTimeNow } from "../../../utils/FormDay";
import { StarRating } from "../../../utils/Rating";

const LoadingReviews = ({ data, index, offset, handleClickImage }) => {
  return (
    <tr>
      <td>{offset + index + 1}</td>
      <td>{data.userId.fullName}</td>
      <td className="img-ne">
        <img
          style={{ cursor: "pointer" }}
          src={data.menuItemId.image_url}
          loading="lazy"
          alt="a"
          onClick={handleClickImage}
        />
      </td>
      <td>{data.menuItemId.name}</td>
      <td>
        <StarRating rating={data.rating} />
      </td>
      <td>{data.comment || "Ngon"}</td>
      <td>
        {FormatDay2(data.createdAt)} ~ {FormatTimeNow(data.createdAt)}
      </td>
    </tr>
  );
};

export default LoadingReviews;
