import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Empty } from "../notfications/Empty";
import Loader from "../notfications/Loader";
import { useSelector, useDispatch } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../context/Functionalities";

const SwipperTop = ({ nextEl, prevEl, movies }) => {
  const { isLoading } = useSelector((state) => state.userGetFavoriteMovies);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };
  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      slidesPerView={4}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1280: {
          slidesPerView: 4,
          spaceBetween: 40,
        },
      }}
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 border-2 border-border hovered w-full h-rate bg-dry rounded-lg overflow-hidden">
            <img
              src={`/images/movies/${movie?.titleImage}`}
              alt={movie.name}
              className="w-full h-full object-cover rounded-lg "
            />
            <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`
              ${
                isLiked(movie)
                  ? "text-white bg-subMain bg-opacity-100"
                  : "text-white  bg-opacity-30 "
              }
              w-12 h-12 flex-colo transitions hover:bg-subMain hover:text-white rounded-full bg-slate-100`}
              >
                <AiFillHeart />
              </button>
              <Link to={`/movie/${movie?._id}`}>{movie?.name}</Link>
              <div className="flex gap-2 text-star">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
const TopRated = ({ isLoading, movies }) => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwipperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <Empty message="It seem's like we don't have any movie" />
        )}
        <div className="w-full px-1 flex-rows gap-6 pt-12">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <FaChevronLeft />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopRated;
