import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../layout/Layout";
import Filters from "../components/Filters";
import Movie from "../components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { getAllMoviesAction } from "../redux/Actions/moviesAction";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../data/FilterData";

const MoviesPage = () => {
  const { search } = useParams();
  const [category, setCategory] = useState({ title: "All categories" });
  const [year, setYear] = useState(YearData[0]);
  const [time, setTimes] = useState(TimesData[0]);
  const [rate, setRate] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  const dispatch = useDispatch();
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All categories" ? "" : category?.title,
      time: time?.title === "Sort By Hours" ? "" : time?.title,
      language: language?.title === "Sort By Language" ? "" : language?.title,
      rate: rate?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, time, language, rate, year, search]);

  useEffect(() => {
    if (isError) {
      toast.error(isError);
    }
    // get all movies
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  // pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };
  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rate: rate,
    setRate: setRate,
    time: time,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-medium my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          Movies Found {search && `for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols3 sm:grid-cols-2 gap-6">
              {movies.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            {/* Loading More */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
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
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className=" w-24 h-24 flex-colo rounded-full mb-4 bg-main text-subMain text-4xl">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seem's like we don't have any movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MoviesPage;
