import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../../api/apiTest";

import "./styles.css";

function MovieDetail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    getMovieDetails();
  }, [id]);
  const navigate = useNavigate();

  const handleWatchMovie = () => {
    // Chuyển hướng người dùng đến trang xem phim
    navigate(`/watch/${movieDetails.id}`);
  };

  const handleWatchTrailer = () => {
    // Chuyển hướng người dùng đến trang xem trailer
    navigate(`/trailer/${movieDetails.id}`);
  };
  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details-container">
      <h2>{movieDetails.title}</h2>
      {movieDetails.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
      )}
      <p>{movieDetails.overview}</p>
      <p>Release Date: {movieDetails.release_date}</p>
      <p>
        Genres:{" "}
        {movieDetails.genres &&
          movieDetails.genres.map((genre) => genre.name).join(", ")}
      </p>
      <p>Director: {movieDetails.director}</p>
      <p>
        Cast:{" "}
        {movieDetails.cast &&
          movieDetails.cast.map((actor) => actor.name).join(", ")}
      </p>
      <button onClick={handleWatchMovie}>Xem Phim</button>
      <button onClick={handleWatchTrailer}>Xem Trailer</button>{" "}
    </div>
  );
}

export default MovieDetail;
