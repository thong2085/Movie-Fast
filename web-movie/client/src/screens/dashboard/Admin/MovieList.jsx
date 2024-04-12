import React, { useEffect } from "react";
import SideBar from "../SideBar";
import Table from "../../../components/Table";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteAllMoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../redux/Actions/moviesAction";
import Loader from "../../../components/notfications/Loader";
import { Empty } from "../../../components/notfications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const MovieList = () => {
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  const dispatch = useDispatch();
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  const { isError: deleteError } = useSelector((state) => state.deleteMovie);
  const { isLoading: deleteAllLoading, isError: deleteAllError } = useSelector(
    (state) => state.deleteAllMovies
  );

  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure you want to delete this movie?") &&
      dispatch(deleteMovieAction(id));
  };

  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies?") &&
      dispatch(deleteAllMoviesAction());
  };

  useEffect(() => {
    if (isError || deleteError || deleteAllError) {
      toast.error(isError || deleteError || deleteAllError);
    }
    dispatch(getAllMoviesAction({}));
  }, [dispatch, isError, deleteError, deleteAllError]);

  // pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Movies List</h2>
          {movies?.length > 0 && (
            <button
              disabled={deleteAllLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain tex-white py-3 px-6 rounded"
            >
              {deleteAllLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteAllLoading ? (
          <Loader />
        ) : movies.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            <div className="w-full flex-rows gap-6 md:my-20 my-5">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no list movies" />
        )}
      </div>
    </SideBar>
  );
};

export default MovieList;
