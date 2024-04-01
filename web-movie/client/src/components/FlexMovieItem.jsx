import React from "react";
import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

const FlexMovieItems = ({ movie }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{movie.category.join(", ")}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegCalendarAlt className="text-subMain" />
        <span className="text-sm font-medium">{movie.year}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaRegClock className="text-subMain" />
        <span className="text-sm font-medium">{movie.time}</span>
      </div>
    </>
  );
};

export default FlexMovieItems;
