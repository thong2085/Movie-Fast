import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Link, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaCloud, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../redux/Actions/moviesAction";
import Loader from "../components/notfications/Loader";
import { IfMovieLiked, LikeMovie } from "../context/Functionalities";
import { AiFillHeart } from "react-icons/ai";

const WatchPage = () => {
  const { id } = useParams();
  const sameClass = "w-full gap-6 flex-colo -min-h-screen";
  const [play, setPlay] = useState();
  const dispatch = useDispatch();
  const { isLoading, isError, movie } = useSelector(
    (state) => state.moviesDetails
  );
  const { isLoading: likeLoading } = useSelector(
    (state) => state.userGetFavoriteMovies
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };

  useEffect(() => {
    // movie ID
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex justify-between flex-wrap py-3 px-3 mb-6 gap-2 bg-main rounded border-2 border-gray-800 ">
            <Link
              to={`/movie/${movie?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
            >
              <BiArrowBack /> {movie?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || likeLoading}
                className={`bg-slate-600 ${
                  isLiked(movie) ? "text-subMain" : "text-white"
                }
                hover:text-subMain transitions px-4 py-3 rounded text-sm
                `}
              >
                <AiFillHeart className="hover:text-subMain w-4 h-4" />
              </button>
              <button className="bg-subMain flex-rows gap-2 hover:text-main transitions px-8 font-medium rounded py-3 text-sm">
                <FaCloud /> Download
              </button>
            </div>
          </div>
        )}

        {/* watch video*/}
        {play ? (
          <video controls autoPlay={play} className="w-full h-full  rounded">
            <source src={movie?.video} type="video/mp4" title={movie?.name} />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className={sameClass}>
                  <div className="flex-colo w-64 h-64 mb-2 rounded-full text-subMain text-4xl">
                    <img
                      src="/images/empty.png"
                      alt="empty"
                      className="text-center w-full"
                    />
                  </div>
                  <p className="text-border text-sm">{isError}</p>
                </div>
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WatchPage;
