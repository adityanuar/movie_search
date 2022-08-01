const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movie/movieController");

router.get("/movie", movieController.controllers.getMovie);

module.exports = router;
