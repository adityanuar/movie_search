const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie/movieController");

router.get("/movie", movieController.controllers.getMovie);
router.get("/moviedetail", movieController.controllers.getMovieDetail);

module.exports = router;
