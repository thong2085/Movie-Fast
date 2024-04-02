import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
const Movie = ({ movie }) => {
  return (
    <>
      <div className=" border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden ">
        <Link to={`/movie/${movie?.name}`} className="w-full">
          <img
            src={`/images/movies/${movie?.image}`}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button className="h-9 w-9 text-sm flex-colo transitons hover:bg-transparent border-2 border-subMain rounded-md bg-subMain text-white">
            <AiFillHeart />
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;
