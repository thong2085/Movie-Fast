import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";

const Rating = ({ value }) => {
  return (
    <>
      <span>
        {value >= 1 ? (
          <FaStar className="w-6 h-6" />
        ) : value >= 0.5 ? (
          <FaRegStarHalfStroke className="w-6 h-6" />
        ) : (
          <FaRegStar className="w-6 h-6" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="w-6 h-6" />
        ) : value >= 1.5 ? (
          <FaRegStarHalfStroke className="w-6 h-6" />
        ) : (
          <FaRegStar className="w-6 h-6" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="w-6 h-6" />
        ) : value >= 2.5 ? (
          <FaRegStarHalfStroke className="w-6 h-6" />
        ) : (
          <FaRegStar className="w-6 h-6" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="w-6 h-6" />
        ) : value >= 3.5 ? (
          <FaRegStarHalfStroke className="w-6 h-6" />
        ) : (
          <FaRegStar className="w-6 h-6" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar className="w-6 h-6" />
        ) : value >= 4.5 ? (
          <FaRegStarHalfStroke className="w-6 h-6" />
        ) : (
          <FaRegStar className="w-6 h-6" />
        )}
      </span>
    </>
  );
};

export default Rating;
