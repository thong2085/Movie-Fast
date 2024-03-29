export const fetchPopularMovies = async (apiKey) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    const popularMoviesWithDate = data.results.map((movie) => ({
      ...movie,
      release_date: new Date(movie.release_date).toLocaleDateString(),
    }));
    return popularMoviesWithDate; // Trả về danh sách các phim phổ biến kèm theo ngày phát hành
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; // Trả về một mảng rỗng trong trường hợp có lỗi xảy ra
  }
};

export const fetchNowPlayingMovies = async (apiKey) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch now playing movies");
    }
    const data = await response.json();
    const playingMoviesWithDate = data.results.map((movie) => ({
      ...movie,
      release_date: new Date(movie.release_date).toLocaleDateString(),
    }));
    return playingMoviesWithDate; // Trả về danh sách các phim đang chiếu tại rạp
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return []; // Trả về một mảng rỗng trong trường hợp có lỗi xảy ra
  }
};

export const fetchPopularTVShows = async (apiKey) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular TV shows");
    }
    const data = await response.json();
    const popularTVShowsWithDate = data.results.map((show) => ({
      ...show,
      release_date: new Date(show.first_air_date).toLocaleDateString(),
      title: show.name, // Sử dụng trường 'name' thay vì 'title'
    }));
    return popularTVShowsWithDate;
  } catch (error) {
    console.error("Error fetching popular TV shows:", error);
    return []; // Trả về một mảng rỗng trong trường hợp có lỗi xảy ra
  }
};

export const fetchPopularRetailMovies = async (apiKey) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch popular movies");
    }
    const data = await response.json();
    const popularRetailMoviesWithDate = data.results.map((movie) => ({
      ...movie,
      release_date: new Date(movie.release_date).toLocaleDateString(),
    }));
    return popularRetailMoviesWithDate;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return []; // Trả về một mảng rỗng trong trường hợp có lỗi xảy ra
  }
};

export const fetchMovieDetails = async (movieId) => {
  const apiKey = "4358b7561a1fa6f335afcffc77a8044f";
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};
