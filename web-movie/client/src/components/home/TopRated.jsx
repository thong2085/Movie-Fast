import React, { useState } from "react";
import Titles from "../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Movies } from "../../data/MovieData";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import Rating from "../Stars";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TopRated = () => {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white";
  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        <Swiper
          navigation={{ nextEl, prevEl }}
          slidesPerView={4}
          spaceBetween={40}
          autoplay={true}
          speed={1000}
          loop={true}
          modules={[Navigation, Autoplay]}
        >
          {Movies.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="hovered w-full h-rate boder-border bg-dry rounded-lg overflow-hidden">
                <img
                  src={`/images/movies/${movie.titleImage}`}
                  alt={movie.name}
                  className="w-full h-full object-cover rounded-lg "
                />
                <div className="px-4 hoveres gap-6 text-center absolute bg-black bg-opacity-50 top-0 left-0 right-0 bottom-0">
                  <button className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-slate-100 bg-opacity-30 text-white">
                    <AiFillHeart />
                  </button>
                  <Link to={`/movie/${movie.name}`}>{movie.name}</Link>
                  <div className="flex gap-2 text-star">
                    <Rating value={movie.rate} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
