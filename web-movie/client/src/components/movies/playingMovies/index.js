import { Card, Col } from "antd";
import { fetchNowPlayingMovies } from "../../../api/apiTest";
import React, { useEffect, useState } from "react";
import "./styles.css";

const { Meta } = Card;
const PlayingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const apiKey = "4358b7561a1fa6f335afcffc77a8044f";
    const getMovies = async () => {
      const playingMovies = await fetchNowPlayingMovies(apiKey);
      setMovies(playingMovies);
    };
    getMovies();
  }, []);
  return (
    <div style={{ marginTop: "16px" }}>
      <h1 style={{ marginBottom: "16px" }}>Phim chiếu rạp mới cập nhật</h1>
      <div className="row-playing-movies">
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6}>
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
          </Col>
        ))}
      </div>
    </div>
  );
};

export default PlayingMovies;
