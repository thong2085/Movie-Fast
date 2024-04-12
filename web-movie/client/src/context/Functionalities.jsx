import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likeMovieAction } from "../redux/Actions/userActions";

// check if movie is added to favorites
const IfMovieLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavoriteMovies);
  return likedMovies?.find((likedMovie) => likedMovie?._id === movie._id);
};

// like movie functionality
const LikeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to favorites")
    : dispatch(
        likeMovieAction({
          movieId: movie._id,
        })
      );
};

export { IfMovieLiked, LikeMovie };
