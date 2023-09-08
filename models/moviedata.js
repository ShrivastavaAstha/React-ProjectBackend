const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  name: { type: String },
  rating: { type: String },
  date: { type: String },
  gener: { type: String },
  description: { type: String },
  Type: { type: String },
  Status: { type: String, enum: ["Unwatched", "Watched", "Rewatch"] },
});
const moviemodel = mongoose.model("movie_datas", movieSchema);
module.exports = moviemodel;
