import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../../api/apiTest";

function WatchMovie() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  if (!movieDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{movieDetails.title}</h2>
      <p>{movieDetails.description}</p>
      <p>Director: {movieDetails.director}</p>
      <p>
        Cast:
        {movieDetails.cast &&
          movieDetails.cast.map((actor) => actor.name).join(", ")}
      </p>
      <p>Release Date: {movieDetails.releaseDate}</p>
      <p>Rating: {movieDetails.rating}</p>
      <iframe
        width="100%"
        height="700"
        src={`https://www.youtube.com/embed/Y0ZsLudtfjI`}
        title={movieDetails.title}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default WatchMovie;
