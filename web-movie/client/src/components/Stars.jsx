import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({ value }) => {
  return (
    <>
      <span>
        {value >= 1 ? (
          <FaStar />
        ) : value >= 0.5 ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar />
        ) : value >= 1.5 ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar />
        ) : value >= 2.5 ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar />
        ) : value >= 3.5 ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar />
        ) : value >= 4.5 ? (
          <FaRegStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
    </>
  );
};

export default Rating;
