import React, { useContext, useEffect, useState } from "react";
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
import { SidebarContext } from "../context/DrawerContext";
import { DownloadVideo } from "../context/Functionalities";
import FileSaver from "file-saver";

const SingleMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setProgress } = useContext(SidebarContext);
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

  // download movie Video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

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
          <div className="flex-colo w-64 h-64 mb-2 rounded-full text-subMain text-4xl">
            <img
              src="/images/empty.png"
              alt="empty"
              className="text-center w-full"
            />
          </div>
          <p className="text-border text-sm mb-4">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />

          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            DownloadVideo={DownloadMovieVideo}
            progress={progress}
          />
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
