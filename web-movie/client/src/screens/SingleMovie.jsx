import React from "react";
import Layout from "../layout/Layout";
import { useParams } from "react-router";
import { Movies } from "../data/MovieData";
import MovieInfo from "../components/Single/MovieInfo";
import MovieCasts from "../components/Single/MovieCasts";
import MovieRates from "../components/Single/MovieRates";
import Titles from "../components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";

const SingleMovie = () => {
  const { id } = useParams();
  const movie = Movies.find((movie) => movie.name === id);
  const RelatedMovies = Movies.filter((m) => m.category === movie.category);
  return (
    <Layout>
      <MovieInfo movie={movie} />
      <div className="container mx-auto min-h-screen p-2 my-6">
        <MovieCasts />
        {/* Rates  */}
        <MovieRates movie={movie} />
        {/* Related */}
        <div className="my-16">
          <Titles title="Related Movies" Icon={BsCollectionFill} />
          <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols3 sm:grid-cols-2 gap-6">
            {RelatedMovies.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleMovie;
