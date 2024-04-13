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

// DELETE MOVIE
export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.DELETE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// DELETE ALL MOVIES
export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case MoviesConstants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE MOVIE
export const createMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstants.CREATE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.CREATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.CREATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.CREATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// UPDATE MOVIE
export const updateMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MoviesConstants.UPDATE_MOVIE_REQUEST:
      return { isLoading: true };
    case MoviesConstants.UPDATE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case MoviesConstants.UPDATE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };
    case MoviesConstants.UPDATE_MOVIE_RESET:
      return {};
    default:
      return state;
  }
};

// CASTS
export const CastsReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case MoviesConstants.ADD_CASTS:
      return { casts: [...state.casts, action.payload] };
    case MoviesConstants.EDIT_CASTS:
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return { casts: updatedCasts };
    case MoviesConstants.DELETE_CASTS:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case MoviesConstants.RESEST_CASTS:
      return { casts: [] };
    default:
      return state;
  }
};
