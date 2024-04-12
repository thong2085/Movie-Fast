import * as MoviesConstants from "../Constants/moviesConstants";

// GET ALL MOVIES
export const getAllMoviesReducer = (
  state = {
    movies: [],
  },
  action
) => {
  switch (action.type) {
    case MoviesConstants.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case MoviesConstants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET RANDOM MOVIES
export const getRandomMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstants.MOVIES_RANDOM_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIES_RANDOM_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case MoviesConstants.MOVIES_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET MOVIE BY ID
export const movieDetailsReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case MoviesConstants.MOVIES_DETAILS_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIES_DETAILS_SUCCESS:
      return { isLoading: false, movie: action.payload };
    case MoviesConstants.MOVIES_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.MOVIES_DETAILS_RESET:
      return { movie: {} };
    default:
      return state;
  }
};

// GET TOP RATED MOVIES
export const getTopRatedMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MoviesConstants.MOVIES_TOP_RATED_REQUEST:
      return { isLoading: true };
    case MoviesConstants.MOVIES_TOP_RATED_SUCCESS:
      return { isLoading: false, movies: action.payload };
    case MoviesConstants.MOVIES_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE REVIEW MOVIE
export const createReviewMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case MoviesConstants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
