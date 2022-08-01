const mongoose = require("mongoose");

const movie = {
  Search: [
    {
      Title: String,
      Year: String,
      imdbID: String,
      Type: String,
      Poster: String,
    },
  ],
  totalResults: String,
  Response: String,
};

const movieCache = {
  Query: String,
  Result: movie,
};
const movieCacheSchema = new mongoose.Schema(movieCache);
module.exports = mongoose.model("MovieCache", movieCacheSchema);
