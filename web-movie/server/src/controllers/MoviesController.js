import asyncHandler from "express-async-handler";
import Movie from "../models/MoviesModel.js";
import { MoviesData } from "../data/MovieData.js";

// ************* PUBLIC CONTROLLERS ****************
// @desc Import the movies
// @route GET /api/movies/import
// @access Public
const importMovies = asyncHandler(async (req, res) => {
  // first we make sure our movies table is empty by delete all documents
  await Movie.deleteMany({});
  // then we insert all movies from MoviesData
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

// @desc Get all movies
// @route GET /api/movies
// @access Public
const getMovies = asyncHandler(async (req, res) => {
  try {
    // filter movies by category, time, language, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }), // Filter movies by many category
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    // load more movies functionality
    const page = Number(req.query.pageNumber) || 1; // if pageNumber is not provided in query we set it to 1
    const limit = 10;
    const skip = (page - 1) * limit; // skip 2 movies per page

    // find movies by query, skip and limit
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get total number of movies
    const count = await Movie.countDocuments(query);

    // send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), // total number of pages
      totalMovies: count, // total number of movies
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Get movies by id
// @route GET /api/movies/:id
// @access Public
const getMovieById = asyncHandler(async (req, res) => {
  try {
    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);
    // if the movie if found send it to the client
    if (movie) {
      res.json(movie);
    }
    // if the movie is not found send 404 error
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Get top rated movies
// @route GET /api/movies/rated/top
// @access Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });
    // send top rated movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Get random movies
// @route GET /api/movies/random/all
// @access Public
const getRandomMovies = asyncHandler(async (req, res) => {
  try {
    // find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    // send random movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ************* PRIVATE CONTROLLERS **************

// @desc Create movie review
// @route POST /api/movies/:id/reviews
// @access Private
const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      // check if the user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // if the user already reviewed this movie send 400 error to the client
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }
      // else create a new review
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment,
      };

      // Ensure reviews is an array before pushing
      if (!Array.isArray(movie.reviews)) {
        movie.reviews = [];
      }

      // push the new review to the reviews array
      movie.reviews.push(review);
      // increment the number of reviews
      movie.numberOfReviews = movie.reviews.length;

      // Calculate the new rate if there are reviews
      if (movie.reviews.length > 0) {
        const totalRating = movie.reviews.reduce(
          (acc, item) => acc + item.rating,
          0
        );
        movie.rate = totalRating / movie.reviews.length;
      } else {
        movie.rate = 0; // Set rate to 0 if there are no reviews
      }

      // save the movie in DB
      await movie.save();
      // send the new movie to the client
      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ************* ADMIN CONTROLLERS **************

// @desc Update movie
// @route PUT /api/movies/:id
// @access Private/Admin
const updateMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      // save the movie in DB
      const updateMovie = await movie.save();
      // send the updated movie to the client
      res.status(201).json(updateMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete movie
// @route DEL /api/movies/:id
// @access Private/Admin
const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // find movie by id in DB
    const movie = await Movie.findById(req.params.id);
    // if the movie is found delete it
    if (movie) {
      await Movie.findByIdAndDelete(req.params.id);
      res.json({ message: "Movie deleted" });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Delete all movies
// @route DEL /api/movies
// @access Private/Admin
const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});
    res.status(201).json({ message: "ALL movie deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @desc Create a new movie
// @route POST /api/movies
// @access Private/Admin
const createMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // create a new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id,
    });
    // save the movie in DB
    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRatedMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
