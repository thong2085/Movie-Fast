import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Movies } from "../../data/MovieData";
import FlexMovieItems from "../FlexMovieItem";
import { Link } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";

const Banner = () => {
  return (
    <div className="relative w-full">
      <Swiper
        className="w-full xl:h-96 bg-dry lg:h-64 h-48"
        direction="vertical"
        slidesPerView={1}
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteractionChange: false }}
      >
        {Movies.slice(0, 6).map((movie, index) => (
          <SwiperSlide key={index} className="relative rounded overflow-hidden">
            <img
              src={`/images/movies/${movie.image}`}
              alt={movie.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute linear-bg xl:pl-52 sm:pl:32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4">
              <div className=" xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold text-white">
                {movie.name}
              </div>
              <div className="flex gap-4 items-center tex-dryGary">
                <FlexMovieItems movie={movie} />
              </div>
              <div className="flex gap-4 items-center tex-dryGary">
                <Link
                  to={`/movie/${movie.name}`}
                  className="bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs"
                >
                  Watch
                </Link>
                <button className="bg-slate-50 hover:text-subMain transitions text-white px-4 py-3 rounded text-sm  bg-opacity-30">
                  <AiFillHeart />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
