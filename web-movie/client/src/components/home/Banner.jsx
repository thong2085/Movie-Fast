import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FlexMovieItems from "../FlexMovieItem";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
import { RiMovie2Line } from "react-icons/ri";

import Loader from "../notfications/Loader";

const Swipper = ({ sameClass, movies }) => {
  return (
    <Swiper
      className={sameClass}
      direction="vertical"
      slidesPerView={1}
      loop={true}
      speed={1000}
      modules={[Autoplay]}
      autoplay={{ delay: 4000, disableOnInteractionChange: false }}
    >
      {movies.slice(0, 6).map((movie, index) => (
        <SwiperSlide key={index} className="relative rounded overflow-hidden">
          <img
            src={`/images/movies/${movie.image}`}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute linear-bg xl:pl-52 sm:pl:32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
            <div className=" xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold text-white">
              {movie?.name}
            </div>
            <div className="flex gap-4 items-center tex-dryGary">
              <FlexMovieItems movie={movie} />
            </div>
            <div className="flex gap-4 items-center tex-dryGary">
              <Link
                to={`/movie/${movie?._id}`}
                className="bg-subMain hover:bg-transparent border-2 transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs hover:border-2 hover:border-subMain"
              >
                Watch
              </Link>
              <button className="bg-dry  transitions text-white px-4 py-3 rounded text-sm  bg-opacity-30">
                <AiFillHeart className="hover:text-subMain w-4 h-4" />
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
const Banner = ({ movies, isLoading }) => {
  const sameClass = "w-full flex-colo xl:h-96 bg-dry lg:h-64 h-48";

  return (
    <div className="relative w-full">
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : movies?.length > 0 ? (
        <Swipper sameClass={sameClass} movies={movies} />
      ) : (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 mb-4 rounded-full text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">
            It seem's like we don't have any movie
          </p>
        </div>
      )}
    </div>
  );
};

export default Banner;
