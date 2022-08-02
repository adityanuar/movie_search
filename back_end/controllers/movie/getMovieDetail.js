const MovieDetailCache = require("../../models/movieDetail");
const axios = require("axios").default;

const getMovieDetail = async (req, res) => {
  try {
    const { i } = req.query;
    const movieDetailCache = await MovieDetailCache.findOne({ ImdbID: i });
    if (movieDetailCache) {
      return res.status(200).json(movieDetailCache.Result);
    }
    const movieDetail = await axios.get(
      `http://www.omdbapi.com/?apikey=d7ffd5b4&i=${i}&plot=full`
    );
    console.log(movieDetail);
    await MovieDetailCache.create({
      ImdbID: i,
      Result: movieDetail.data,
    });
    return res.status(200).json(movieDetail.data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = getMovieDetail;
