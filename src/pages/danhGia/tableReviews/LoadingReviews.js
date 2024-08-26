import React from "react";
import { FormatDay2, FormatTimeNow } from "../../../utils/FormDay";
import { StarRating } from "../../../utils/Rating";

const LoadingReviews = ({ data, index, offset, handleClick }) => {
  return (
    <tr>
      <td>{offset + index + 1}</td>
      <td>{data.userId.fullName}</td>
      <td className="img-ne">
        <img src={data.userId.img_avatar_url} loading="lazy" alt="a" />
      </td>
      <td>
        <StarRating rating={data.rating} />
      </td>
      <td>{data.comment}</td>
      <td>
        {FormatDay2(data.createdAt)} ~ {FormatTimeNow(data.createdAt)}
      </td>
      <td>
        <button onClick={handleClick} className="btn btn-success">
          Xem món đánh giá
        </button>
      </td>
    </tr>
  );
};

export default LoadingReviews;
