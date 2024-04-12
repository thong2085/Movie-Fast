import * as MoviesConstants from "../Constants/moviesConstants";
import * as MoviesAPIs from "../APIs/MoviesServices";
import { ErrorsAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

// get all movies action
export const getAllMoviesAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: MoviesConstants.MOVIES_LIST_REQUEST,
      });
      const response = await MoviesAPIs.getAllMoviesService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: MoviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstants.MOVIES_LIST_FAIL);
    }
  };

// get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await MoviesAPIs.getRandomMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_RANDOM_FAIL);
  }
};

// get movie by id action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_DETAILS_REQUEST });
    const response = await MoviesAPIs.getMovieByIdService(id);
    dispatch({
      type: MoviesConstants.MOVIES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_DETAILS_FAIL);
  }
};

// get top rated movies action
export const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: MoviesConstants.MOVIES_TOP_RATED_REQUEST });
    const response = await MoviesAPIs.getTopRatedMoviesService();
    dispatch({
      type: MoviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, MoviesConstants.MOVIES_TOP_RATED_FAIL);
  }
};

// create review action
export const createReviewAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: MoviesConstants.CREATE_REVIEW_REQUEST });
      const response = await MoviesAPIs.reviewMovieService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: MoviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review created successfully");
      dispatch({ type: MoviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, MoviesConstants.CREATE_REVIEW_FAIL);
    }
  };
