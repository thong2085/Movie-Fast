import { useEffect } from "react";
import React from "react";
import SideBar from "./SideBar";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../components/notfications/Loader";
import { Empty } from "../../components/notfications/Empty";

const FavoritesMovies = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  // delete favorite movies
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  // delete favorite movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are you sure you want to delete all movies?") &&
      dispatch(deleteFavoriteMoviesAction());
  };

  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  const sortedMovies = likedMovies
    ? [...likedMovies].sort((a, b) => b.year - a.year)
    : [];

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold text-white">Favorites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-subMain  text-medium font-medium transitions hover:bg-main border-2 border-subMain text-white py-3 px-6 rounded w-full sm:w-auto"
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : sortedMovies.length > 0 ? (
          <Table data={sortedMovies} admin={false} />
        ) : (
          <Empty message="You have no favorites movies" />
        )}
      </div>
    </SideBar>
  );
};

export default FavoritesMovies;
