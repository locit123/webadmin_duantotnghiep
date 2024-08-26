import React from "react";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
export const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);

  const halfStar = rating % 1 !== 0 ? true : false;

  return (
    <div>
      {[...Array(fullStars)].map((_, index) => (
        <span key={index}>
          <FaStar />
        </span>
      ))}
      {halfStar && (
        <span>
          <FaStarHalfAlt />
        </span>
      )}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, index) => (
        <span key={index + fullStars}>
          <CiStar />
        </span>
      ))}
    </div>
  );
};
