const mongoose = require("mongoose");

const movieDetail = {
  Title: String,
  Year: String,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Poster: String,
  Ratings: [
    {
      Source: String,
      Value: String,
    },
  ],
  Metascore: String,
  imdbRating: String,
  imdbVotes: String,
  imdbID: String,
  Type: String,
  DVD: String,
  BoxOffice: String,
  Production: String,
  Website: String,
  Response: String,
};

const movieDetailCache = {
  ImdbID: String,
  Result: movieDetail,
};
const movieDetailCacheSchema = new mongoose.Schema(movieDetailCache);
module.exports = mongoose.model("MovieDetailCache", movieDetailCacheSchema);
