import React from "react";
import PopularMovies from "../../components/movies/popularMovies";
import PlayingMovies from "../../components/movies/playingMovies";
import PopularRetailMovies from "../../components/movies/popularRetailMovies";
import PopularTVShows from "../../components/movies/popularTVShows";
import RecommendedMovies from "../../components/movies/recommendedMovies";
const HomePage = () => {
  return (
    <div>
      <article style={{ padding: "20px", backgroundColor: "#303030" }}>
        <PopularMovies />
        <PlayingMovies />
        <PopularRetailMovies />
        <PopularTVShows />
        {/* <RecommendedMovies /> */}
      </article>
    </div>
  );
};

export default HomePage;
