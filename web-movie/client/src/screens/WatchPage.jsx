import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Link, useParams } from "react-router-dom";
import { Movies } from "../data/MovieData";
import { BiArrowBack } from "react-icons/bi";
import { FaCloud, FaHeart, FaPlay } from "react-icons/fa";

const WatchPage = () => {
  let { id } = useParams();
  const movie = Movies.find((movie) => movie.name === id);
  const [play, setPlay] = useState();
  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        <div className="flex justify-between flex-wrap py-3 px-3 mb-6 gap-2 bg-main rounded border-2 border-gray-800 ">
          <Link
            to={`/movie/${movie?.name}`}
            className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
          >
            <BiArrowBack /> {movie.name}
          </Link>
          <div className="flex-btn sm:w-auto w-full gap-5">
            <button className="bg-dryGray hover:text-subMain transitions bg-opacity-30 rounded px-4 py-3 text-sm">
              <FaHeart />
            </button>
            <button className="bg-subMain flex-rows gap-2 hover:text-main transitions px-8 font-medium rounded py-3 text-sm">
              <FaCloud /> Download
            </button>
          </div>
        </div>

        {/* watch video*/}
        {play ? (
          <video controls autoPlay={play} className="w-full h-full  rounded">
            <source
              src="/images/movies/movie.mp4"
              type="video/mp4"
              title={movie?.name}
            />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 bottom-0  bg-main bg-opacity-30 flex-colo">
              <button
                onClick={() => setPlay(true)}
                className="bg-white text-subMain flex-colo border-subMain rounded-full w-20 h-20 font-medium text-xl"
              >
                <FaPlay />
              </button>
            </div>
            <img
              src={
                movie?.image
                  ? `/images/movies/${movie?.image}`
                  : "images/user.png"
              }
              alt={movie?.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;
