import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IfMovieLiked, LikeMovie } from "../context/Functionalities";
import { useSelector, useDispatch } from "react-redux";

const Movie = ({ movie }) => {
  const { isLoading } = useSelector((state) => state.userGetFavoriteMovies);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };
  return (
    <>
      <div className=" p-1 bg-dry border-2 border-border hover:scale-95 transitions relative rounded overflow-hidden ">
        <Link to={`/movie/${movie?._id}`} className="w-full">
          <img
            src={`/images/movies/${movie?.image}`}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{movie?.name}</h3>
          <button
            onClick={() => LikeMovie(movie, dispatch, userInfo)}
            disabled={isLiked(movie) || isLoading}
            className={`${
              isLiked(movie) ? "text-white bg-transparent" : "text-white"
            }
            h-9 w-9 text-sm flex-colo transitons hover:bg-transparent border-2 border-subMain rounded-md bg-subMain
            `}
          >
            <AiFillHeart />
          </button>
        </div>
      </div>
    </>
  );
};

export default Movie;
