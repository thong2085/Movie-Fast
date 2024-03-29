import { Card, Col } from "antd";
import { fetchPopularMovies } from "../../../api/apiTest";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";

const { Meta } = Card;

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "4358b7561a1fa6f335afcffc77a8044f";
    const getMovies = async () => {
      const popularMovies = await fetchPopularMovies(apiKey);
      setMovies(popularMovies);
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Phim mới nổi bật</h1>
      <div className="row-popular-movies">
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/movie/${movie.id}`}>
              <Card
                hoverable
                style={{ width: "75%", marginBottom: "16px" }}
                cover={
                  <img
                    alt={movie.title}
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  />
                }
              >
                <Meta
                  title={movie.title}
                  description={`Ngày phát hành: ${movie.release_date}`}
                />
              </Card>
            </Link>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
