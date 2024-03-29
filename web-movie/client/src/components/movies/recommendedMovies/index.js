// RecommendedMovies.js

import React, { useState, useEffect } from "react";
import { fetchPopularRetailMovies } from "../../../api/apiTest";
import { Card } from "antd";

const { Meta } = Card;

const RecommendedMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "4358b7561a1fa6f335afcffc77a8044f";
    const getRecommendedMovies = async () => {
      const recommendedMovies = await fetchPopularRetailMovies(apiKey);
      setMovies(recommendedMovies);
    };
    getRecommendedMovies();
  }, []);

  return (
    <div>
      <h2>Phim gợi ý</h2>
      {movies.map((movie) => (
        <Card
          key={movie.id}
          hoverable
          style={{ width: 200, marginBottom: 16 }}
          cover={
            <img
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            />
          }
        >
          <Meta title={movie.title} />
        </Card>
      ))}
    </div>
  );
};

export default RecommendedMovies;
