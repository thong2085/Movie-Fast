import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router";
import MovieInfo from "../components/Single/MovieInfo";
import MovieCasts from "../components/Single/MovieCasts";
import MovieRates from "../components/Single/MovieRates";
import Titles from "../components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../redux/Actions/moviesAction";
import Loader from "../components/notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";

const SingleMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const sameClass = "w-full gap-6 flex-colo -min-h-screen";
  const dispatch = useDispatch();
  const { isLoading, isError, movie } = useSelector(
    (state) => state.moviesDetails
  );
  const { movies } = useSelector((state) => state.getAllMovies);
  const RelatedMovies = movies?.filter((m) =>
    m?.category?.some((cat) => movie?.category?.includes(cat))
  );

  useEffect(() => {
    // movie ID
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 mb-4 rounded-full text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />

          <MovieInfo movie={movie} setModalOpen={setModalOpen} />
          <div className="container mx-auto min-h-screen p-2 my-6">
            <MovieCasts movie={movie} />
            {/* Rates  */}
            <MovieRates movie={movie} />
            {/* Related */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default SingleMovie;
