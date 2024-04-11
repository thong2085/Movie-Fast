import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import Banner from "../components/home/Banner";
import PopularMovies from "../components/home/PopularMovies";
import TopRated from "../components/home/TopRated";
import Promos from "../components/home/Promos";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../redux/Actions/moviesAction";
import toast from "react-hot-toast";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.randomMovies);

  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.topRatedMovies);
  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );

  useEffect(() => {
    // get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get top rated movies
    dispatch(getTopRatedMoviesAction());
    // error
    if (isError || randomError || topError) {
      toast.error("Something went wrong!");
    }
  }, [dispatch, isError, randomError, topError]);
  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
};

export default HomeScreen;
