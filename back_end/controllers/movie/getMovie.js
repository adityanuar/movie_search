const MovieCache = require("../../models/movie");
const axios = require("axios").default;

const getMovie = async (req, res) => {
  try {
    const { s, page } = req.query;
    const query = `s=${s}&page=${page}`;
    const movieCache = await MovieCache.findOne({ Query: query });
    if (movieCache) {
      return res.status(200).json(movieCache.Result);
    }
    const movie = await axios.get(
      `http://www.omdbapi.com/?apikey=d7ffd5b4&s=${s}&page=${page}`
    );
    console.log(movie);
    await MovieCache.create({
      Query: query,
      Result: movie.data,
    });
    return res.status(200).json(movie.data);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong. Please try again");
  }
};

module.exports = getMovie;
