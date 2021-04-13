var router = require("express").Router();
import {
  searchMovieByName,
  getCriticsPicks,
  getAllMovies,
  getCritic,
  getPicksAndCritics
} from "../../client/getMoviesApi";
import { createNewMovie, getMovieById, updateMovie, deleteMovie } from "../../services/movie";

// Movie Favorite Routes

router.post("/movies/favorites", async function (req, res, next) {
  const response = await createNewMovie(req.body.movie);
  return res.json(response);
});

router.get("/movies/favorites/:movieId", async function (req, res, next) {
  const response = await getMovieById(req.params.movieId);
  return res.json(response);
});

router.put("/movies/favorites/:movieId", async function (req, res, next) {
  const response = await updateMovie(req.params.movieId, req.body.movie);
  return res.json(response);
});

router.delete("/movies/favorites/:movieId", async function (req, res, next) {
  const response = await deleteMovie(req.params.movieId);
  return res.json(response);
});

// Movie Client Routes

router.get("/movies", async function (req, res, next) {
  const response: Object = await searchMovieByName(req.query.movieName);
  return res.json(response);
});
router.get("/movies/picks", async function (req, res, next) {
  const response: Object = await getCriticsPicks();
  return res.json(response);
});

router.get("/movies/all", async function (req, res, next) {
  const response: Object = await getAllMovies();
  return res.json(response);
});

router.get("/movies/critic", async function (req, res, next) {
  const response: Object = await getCritic();
  return res.json(response);
});

router.get("/movies/picks/critics", async function (req, res, next) {
  const response: Object = await getPicksAndCritics();
  return res.json(response);
});

module.exports = router;
